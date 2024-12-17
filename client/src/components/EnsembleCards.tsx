import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faMusic, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { EnsembleCore } from "@packages/types";

type EnsembleCardProps = {
  ensemble: EnsembleCore;
};

const EnsembleCard: React.FC<EnsembleCardProps> = ({ 
  ensemble,
}) => {
  const navigate = useNavigate();

  const openPositions = ensemble.positions.filter(pos => !pos.userId);
  const isComplete = openPositions.length === 0;

  // Get unique instruments needed
  const uniqueInstruments = [...new Set(openPositions.map(pos => pos.instrumentId))];

  return (
    <div 
      className="bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-xl p-6 transition-all duration-300 min-h-[180px] flex flex-col justify-between group relative overflow-hidden cursor-pointer"
      onClick={() => navigate(`/ensemble/${ensemble._id}`)}
    >
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-900 group-hover:text-red-600 transition-colors">
            {ensemble.name}
          </h3>
          
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center">
          <FontAwesomeIcon 
            icon={faUserGroup} 
            className={`mr-2 ${isComplete ? 'text-gray-500' : 'text-yellow-600'}`}
          />
          <span className={`text-sm font-medium ${isComplete ? 'text-gray-500' : 'text-yellow-600'}`}>
            {isComplete 
              ? 'Ensemble complete' 
              : `Looking for ${openPositions.length} position${openPositions.length !== 1 ? 's' : ''}`
            }
          </span>
        </div>

        {/* Needed Instruments */}
        {!isComplete && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {uniqueInstruments.map((instrument, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  <FontAwesomeIcon icon={faMusic} className="mr-1 text-gray-500" />
                  {instrument}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 relative z-10 w-4/5">
      </div>

      {/* Watermark Icon */}
      <FontAwesomeIcon 
        icon={faGuitar}
        className="absolute -bottom-4 -right-4 text-gray-200 text-8xl transform rotate-12 scale-x-[-1] group-hover:text-gray-300 transition-colors"
      />
    </div>
  );
};

export default EnsembleCard;
