import React from 'react';

type EnsembleCardProps = {
  name: string;
  description: string;
};

const EnsembleCard: React.FC<EnsembleCardProps> = ({ name, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default EnsembleCard;
