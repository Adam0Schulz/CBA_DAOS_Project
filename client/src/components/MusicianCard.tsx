import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { MusicianWithInstrument } from "@packages/types";

interface MusicianCardProps {
  musician: MusicianWithInstrument;
}

export const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              {musician.firstName} {musician.lastName}
            </h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600 flex items-center">
                <span className="font-medium w-24">Email:</span>
                {musician.email}
              </p>
              <p className="text-gray-600 flex items-center">
                <span className="font-medium w-24">Instrument:</span>
                {musician.instrumentName ? (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faMusic} className="mr-2 text-blue-500" />
                    {musician.instrumentName}
                  </span>
                ) : (
                  <span className="text-gray-400">No instrument specified</span>
                )}
              </p>
              <p className="text-gray-600 flex items-center">
                <span className="font-medium w-24">Address:</span>
                {musician.details?.address ? (
                  musician.details.address
                ) : (
                  <span className="text-gray-400">No address provided</span>
                )}
              </p>
              <div className="mt-3">
                <p className="font-medium text-gray-700">Description:</p>
                <p className="text-gray-600 mt-1">
                  {musician.details?.description || (
                    <span className="text-gray-400">No description available</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            musician.details?.isOpenToWork 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {musician.details?.isOpenToWork ? 'Open to Work' : 'Not Available'}
          </span>
        </div>
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <span className="font-medium w-24">Last active:</span>
          {musician.details?.lastLoggedIn ? (
            formatDate(musician.details.lastLoggedIn)
          ) : (
            <span className="text-gray-400">Never logged in</span>
          )}
        </div>
      </div>
    </div>
  );
};
