import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface AddPositionCardProps {
    onAddPosition: (instrumentId: string) => void;
}

const AddPositionCard: React.FC<AddPositionCardProps> = ({ onAddPosition }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [error, setError] = useState('');

    const instruments = [
        'Violin', 'Viola', 'Cello', 'Double Bass',
        'Flute', 'Oboe', 'Clarinet', 'Bassoon',
        'French Horn', 'Trumpet', 'Trombone', 'Tuba',
        'Piano', 'Percussion'
    ];

    const handleSubmit = () => {
        if (!selectedInstrument) {
            setError('Please select an instrument');
            return;
        }
        onAddPosition(selectedInstrument);
        setIsAdding(false);
        setSelectedInstrument('');
        setError('');
    };

    if (!isAdding) {
        return (
            <div 
                onClick={() => setIsAdding(true)}
                className="bg-white border-2 border-dashed border-gray-300 shadow-md rounded-xl p-6 cursor-pointer hover:border-[#343B5D] transition-colors min-h-[200px] flex flex-col items-center justify-center"
            >
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className="text-4xl mb-4 text-gray-400"
                />
                <span className="text-gray-600 font-medium">Add New Position</span>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 min-h-[200px]">
            <h3 className="font-bold mb-4" style={{ color: '#343B5D' }}>
                Add New Position
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Instrument
                    </label>
                    <select
                        value={selectedInstrument}
                        onChange={(e) => {
                            setSelectedInstrument(e.target.value);
                            setError('');
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#343B5D] focus:border-transparent"
                    >
                        <option value="">Select an instrument...</option>
                        {instruments.map((instrument) => (
                            <option key={instrument} value={instrument}>
                                {instrument}
                            </option>
                        ))}
                    </select>
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <button
                        onClick={() => {
                            setIsAdding(false);
                            setSelectedInstrument('');
                            setError('');
                        }}
                        className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#343B5D' }}
                    >
                        Add Position
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPositionCard;
