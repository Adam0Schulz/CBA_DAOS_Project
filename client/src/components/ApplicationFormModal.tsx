import React, { useState } from 'react';

interface ApplicationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string) => void;
    instrumentName: string;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    instrumentName
}) => {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(message);
        setMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#343B5D' }}>
                    Apply for {instrumentName} Position
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label 
                            htmlFor="message" 
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Application Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message to the ensemble owner..."
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-white rounded-lg transition-colors"
                            style={{ backgroundColor: '#343B5D' }}
                        >
                            Send Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationFormModal;
