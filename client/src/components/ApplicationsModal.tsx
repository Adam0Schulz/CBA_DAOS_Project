import React, { useEffect, useState } from 'react';
import { ApplicationCore } from '@packages/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getApplicationsByPositionId, deleteApplication, acceptApplication } from '../services/applications.service';

interface ApplicationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    positionId: string;
    onPositionUpdate: () => void;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
    isOpen,
    onClose,
    positionId,
    onPositionUpdate,
}) => {
    const [applications, setApplications] = useState<ApplicationCore[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && positionId) {
            fetchApplications();
        }
        console.log("applications", applications)
    }, [isOpen, positionId]);

    const fetchApplications = async () => {
        try {
            const data = await getApplicationsByPositionId(positionId);
            setApplications(data);
            setError(null);
        } catch (err) {
            setError('Failed to load applications');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDecline = async (applicationId: string) => {
        try {
            await deleteApplication(applicationId);
            // Remove the declined application from the state
            setApplications(applications.filter(app => app._id !== applicationId));
            // If this was the last application, close the modal
            if (applications.length <= 1) {
                onClose();
            }
        } catch (err) {
            console.error('Error declining application:', err);
            setError('Failed to decline application');
        }
    };

    const handleAccept = async (acceptedApplicationId: string, userId: string) => {
        try {
            await acceptApplication(acceptedApplicationId, positionId, userId);
            
            // Decline all other applications
            const otherApplications = applications.filter(app => app._id !== acceptedApplicationId);
            await Promise.all(otherApplications.map(app => deleteApplication(app._id)));
            
            // Update local state
            setApplications([]);
            
            // Refresh the position card
            onPositionUpdate();
            
            // Close the modal since the position is now filled
            onClose();
        } catch (err) {
            console.error('Error accepting application:', err);
            setError('Failed to accept application');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold" style={{ color: '#343B5D' }}>Applications</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#343B5D' }}></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                ) : applications.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">No applications yet</div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((application) => {
                            // Early return if no _id
                            if (!application._id) return null;

                            return (
                                <div
                                    key={application._id}
                                    className="bg-[#F4F5F4] p-4 rounded-lg"
                                >
                                    <div className="mb-2">
                                        <h3 className="font-semibold text-gray-800">Message:</h3>
                                        <p className="text-gray-700">{application.message}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-sm text-gray-500">
                                            Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleAccept(application._id, application.userId)}
                                                className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"
                                                style={{ backgroundColor: '#343B5D' }}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDecline(application._id)}
                                                className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"
                                                style={{ backgroundColor: '#BE1F2E' }}
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsModal;
