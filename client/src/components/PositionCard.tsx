import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faCrown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

type PositionCardProps = {
    instrumentId: string;
    userId?: string;
    isOwner: boolean;
    canApply?: boolean;
    onApply?: () => void;
};

const PositionCard: React.FC<PositionCardProps> = ({ 
    instrumentId, 
    userId, 
    isOwner,
    canApply,
    onApply
}) => {
    return (
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
            
            {/* Apply Button - only show for open positions when user can apply */}
            {!userId && canApply && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={onApply}
                        className="w-full flex items-center justify-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#343B5D' }}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Apply for Position
                    </button>
                </div>
            )}
        </div>
    );
};

export default PositionCard;
