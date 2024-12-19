import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faCrown, faPaperPlane, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ApplicationFormModal from './ApplicationFormModal';
import ApplicationsModal from './ApplicationsModal';
import { UserDetails } from '@/services/userDetails.service';
import { userService } from '@/services/users.service';

type PositionCardProps = {
    instrumentId: string;
    positionId: string;
    userId?: string;
    isOwner: boolean;
    isEnsembleOwner?: boolean;
    canApply?: boolean;
    userDetails?: UserDetails | null;
    onApply?: (message: string) => void;
};

const PositionCard: React.FC<PositionCardProps> = ({ 
    instrumentId, 
    positionId,
    userId, 
    isOwner,
    isEnsembleOwner,
    canApply,
    userDetails,
    onApply
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
    const [localUserId, setLocalUserId] = useState(userId);
    const [applicationCount, setApplicationCount] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const hasApplied = userDetails?.applicationId?.positionId === positionId;

    useEffect(() => {
        if (isEnsembleOwner) {
            fetchApplicationCount();
        }
    }, [isEnsembleOwner, positionId]);

    useEffect(() => {
        if (localUserId && localUserId !== 'filled') {
            fetchUserName();
        }
    }, [localUserId]);

    const fetchUserName = async () => {
        try {
            const user = await userService.getUserById(localUserId!);
            setUserName(`${user.firstName} ${user.lastName}`);
        } catch (err) {
            console.error('Error fetching user name:', err);
            setUserName('Unknown User');
        }
    };

    const fetchApplicationCount = async () => {
        try {
            const response = await fetch(`http://localhost:5000/applications?positionId=${positionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const applications = await response.json();
            setApplicationCount(applications.length);
        } catch (err) {
            console.error('Error fetching application count:', err);
        }
    };

    const handleApply = (message: string) => {
        if (onApply) {
            onApply(message);
        }
    };

    return (
        <>
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <FontAwesomeIcon 
                            icon={faMusic} 
                            className="text-gray-500 mr-3 text-xl"
                        />
                        <div>
                            <h3 className="font-bold" style={{ color: '#343B5D' }}>
                                {instrumentId}
                            </h3>
                            <div className="flex items-center mt-2">
                                <FontAwesomeIcon 
                                    icon={faUser} 
                                    className={`mr-2 ${localUserId ? 'text-green-600' : 'text-yellow-600'}`}
                                />
                                <span className={`text-sm ${localUserId ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {localUserId ? (userName ? `Filled by ${userName}` : 'Position Filled') : 'Position Open'}
                                </span>
                            </div>
                        </div>
                    </div>
                    {isOwner && (
                        <FontAwesomeIcon 
                            icon={faCrown} 
                            className="text-yellow-500 text-xl"
                            title="Ensemble Owner"
                        />
                    )}
                </div>
                
                {/* Apply Button or Applied Status */}
                {!localUserId && (hasApplied || canApply) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        {hasApplied ? (
                            <button
                                disabled
                                className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 text-green-600 font-medium"
                            >
                                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                Applied
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center justify-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: '#343B5D' }}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                Apply for Position
                            </button>
                        )}
                    </div>
                )}

                {/* View Applications Button (Only for owners and open positions) */}
                {isEnsembleOwner && !localUserId && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setIsApplicationsModalOpen(true)}
                            className={`w-full flex items-center justify-center px-4 py-2 text-white rounded-lg transition-opacity ${
                                applicationCount > 0 
                                    ? 'hover:opacity-90'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            style={{ backgroundColor: applicationCount > 0 ? '#343B5D' : '#9CA3AF' }}
                            disabled={applicationCount === 0}
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            {applicationCount > 0 
                                ? `View Applications (${applicationCount})`
                                : 'No Applications Yet'}
                        </button>
                    </div>
                )}
            </div>

            <ApplicationFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleApply} 
                instrumentName={instrumentId}
            />

            <ApplicationsModal
                isOpen={isApplicationsModalOpen}
                onClose={() => setIsApplicationsModalOpen(false)}
                positionId={positionId}
                onPositionUpdate={() => {
                    setLocalUserId('filled');
                    fetchApplicationCount(); // Refresh the count after modal closes
                }}
            />
        </>
    );
};

export default PositionCard;
