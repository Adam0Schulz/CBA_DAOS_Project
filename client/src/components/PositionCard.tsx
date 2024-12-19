import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faCrown, faPaperPlane, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ApplicationFormModal from './ApplicationFormModal';
import ApplicationsModal from './ApplicationsModal';
import { UserDetails } from '@/services/userDetails.service';

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
    const hasApplied = userDetails?.applicationId?.positionId === positionId;

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
                                    className={`mr-2 ${userId ? 'text-green-600' : 'text-yellow-600'}`}
                                />
                                <span className={`text-sm ${userId ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {userId ? 'Position Filled' : 'Position Open'}
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
                {!userId && (hasApplied || canApply) && (
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
                {isEnsembleOwner && !userId && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setIsApplicationsModalOpen(true)}
                            className="w-full flex items-center justify-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#343B5D' }}
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            View Applications
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
            />
        </>
    );
};

export default PositionCard;
