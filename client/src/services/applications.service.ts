import { ApplicationCore } from '@packages/types';

const API_URL = 'http://localhost:5000';

export const getApplicationsByPositionId = async (positionId: string): Promise<ApplicationCore[]> => {
    const response = await fetch(`${API_URL}/applications?positionId=${positionId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    return response.json();
};

export const deleteApplication = async (applicationId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to decline application');
    }
};

export const acceptApplication = async (applicationId: string, positionId: string, userId: string): Promise<void> => {
    // Update position with the accepted user
    const updatePositionResponse = await fetch(`${API_URL}/positions/${positionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!updatePositionResponse.ok) {
        throw new Error('Failed to update position');
    }

    // Delete the application
    await deleteApplication(applicationId);
};
