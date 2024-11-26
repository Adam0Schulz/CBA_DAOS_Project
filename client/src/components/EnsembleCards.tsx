import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrash, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

type EnsembleCardProps = {
  name: string;
  description: string;
  isAddCard?: boolean;
  onAdd?: () => void;
  onJoin?: () => void;
  onDelete?: () => void;
  onLeave?: () => void;
  isCreator?: boolean;
  isMember?: boolean;
};

const EnsembleCard: React.FC<EnsembleCardProps> = ({ 
  name, 
  description, 
  isAddCard,
  onAdd,
  onJoin,
  onDelete,
  onLeave,
  isCreator,
  isMember
}) => {
  console.log('EnsembleCard props:', { name, description, isAddCard });
  if (isAddCard) {
    return (
      <div 
        onClick={onAdd}
        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[200px] flex flex-col items-center justify-center hover:bg-blue-50 border-2 border-dashed border-blue-200 group"
      >
        <FontAwesomeIcon 
          icon={faPlus} 
          className="text-4xl text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300" 
        />
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Add New Ensemble</h3>
        <p className="text-gray-600 mt-2 text-center">Create a new music ensemble</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 min-h-[200px] flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{name}</h3>
          {isCreator && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Creator
            </span>
          )}
          {isMember && !isCreator && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Member
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 gap-3">
        {!isCreator && !isMember && (
          <button
            onClick={onJoin}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Join
          </button>
        )}
        {isCreator && (
          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </button>
        )}
        {isMember && !isCreator && (
          <button
            onClick={onLeave}
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm hover:shadow-md"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Leave
          </button>
        )}
      </div>
    </div>
  );
};

export default EnsembleCard;
