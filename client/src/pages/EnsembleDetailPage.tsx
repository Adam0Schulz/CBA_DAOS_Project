import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnsembleCore } from '@packages/types';
import { ensemblesService } from '@/services/ensembles.service';
import PositionCard from '@/components/PositionCard';
import AddPositionCard from '@/components/AddPositionCard';
import { useAuth } from '@/hooks/useAuth';

export default function EnsembleDetailPage() {
    const { ensembleId } = useParams();
    const navigate = useNavigate();
    const [ensemble, setEnsemble] = useState<EnsembleCore | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, userDetails, fetchUserDetails } = useAuth();
    
    const isEnsembleOwner = ensemble?.positions.some(position => position.userId === user?.id && position.isOwner);
    const isUserInEnsemble = ensemble?.positions.some(position => position.userId === user?.id);

    const [applicationStatus, setApplicationStatus] = useState<{
        loading: boolean;
        error: string | null;
        success: boolean;
    }>({
        loading: false,
        error: null,
        success: false
    });

    useEffect(() => {
        const fetchEnsemble = async () => {
            if (!ensembleId) {
                setError('No ensemble ID provided');
                setLoading(false);
                return;
            }

            try {
                const data = await ensemblesService.getEnsembleById(ensembleId);
                setEnsemble(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch ensemble');
            } finally {
                setLoading(false);
            }
        };

        fetchEnsemble();
    }, [ensembleId]);

    const handleApplyForPosition = async (positionId: string, message: string) => {
        if (!ensembleId || !user?.id) return;
        
        setApplicationStatus({ loading: true, error: null, success: false });
        try {
            await ensemblesService.sendPositionApplication(positionId, user.id, message);
            setApplicationStatus({ loading: false, error: null, success: true });
            
            // Refresh user details to update the application status
            await fetchUserDetails(user.id);
            
            // Refresh ensemble data after successful application
            const updatedEnsemble = await ensemblesService.getEnsembleById(ensembleId);
            setEnsemble(updatedEnsemble);
        } catch (err) {
            setApplicationStatus({
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to send application',
                success: false
            });
        }
    };

    const handleAddPosition = async (instrumentId: string) => {
        
        if (!ensembleId) return;

        try {
            const newPosition = await ensemblesService.createPosition(ensembleId, instrumentId);
            // Update the ensemble with the new position
            setEnsemble(prev => prev ? {
                ...prev,
                positions: [...prev.positions, newPosition]
            } : null);
        } catch (err) {
            console.error('Error adding position:', err);
            // You might want to show this error to the user in a more user-friendly way
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">{error}</div>;
    }

    if (!ensemble) {
        return <div className="p-4">Ensemble not found</div>;
    }

    return (
        <main className="min-h-screen bg-white pt-20 flex flex-col">
            {applicationStatus.success && (
                <div className="fixed top-24 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Application sent successfully!
                </div>
            )}
            {applicationStatus.error && (
                <div className="fixed top-24 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {applicationStatus.error}
                </div>
            )}
            <div className="bg-white pt-16 pb-12 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/ensembles')}
                        className="mb-12 px-4 py-1.5 text-sm font-medium rounded-lg bg-white text-[#343B5D] border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                    >
                        Go Back
                    </button>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4" style={{ color: '#343B5D' }}>{ensemble.name}</h1>
                        <p className="text-gray-600 mb-6">{ensemble.description}</p>
                    </div>
                </div>
            </div>

            {/* Positions Section */}
            <div className="bg-[#F4F5F4] py-8 px-4 flex-grow">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#343B5D' }}>Positions</h2>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {ensemble.positions.map((position, index) => (
                            <PositionCard
                                key={index}
                                instrumentId={position.instrumentId}
                                positionId={position._id}
                                userId={position.userId}
                                isOwner={position.isOwner}
                                isEnsembleOwner={isEnsembleOwner === undefined ? false : isEnsembleOwner}
                                canApply={!isUserInEnsemble && !!user && !position.userId && !userDetails?.applicationId}
                                userDetails={userDetails}
                                onApply={(message) => handleApplyForPosition(position._id, message)}
                            />
                        ))}
                        
                        {/* Add Position Card */}
                        {isEnsembleOwner && (
                            <AddPositionCard onAddPosition={handleAddPosition} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
