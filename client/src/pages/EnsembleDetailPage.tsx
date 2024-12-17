import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EnsembleCore } from '@packages/types';
import { ensemblesService } from '@/services/ensembles.service';

export default function EnsembleDetailPage() {
    const { ensembleId } = useParams();
    const [ensemble, setEnsemble] = useState<EnsembleCore | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="p-4 mt-20">
            <h1 className="text-2xl font-bold mb-4">{ensemble.name}</h1>
            {/* More ensemble details will be added here */}
        </div>
    );
}
