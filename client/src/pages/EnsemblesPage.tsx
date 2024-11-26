import React, { useState, useEffect } from "react";
import EnsembleCard from "@/components/EnsembleCards";
import EnsembleFormModal from "@/components/EnsembleFormModal";
import { useAuth } from "@/hooks/useAuth";
import { EnsembleCore } from "@packages/types";
import { ensemblesService } from "@/services/ensembles.service";

const EnsemblePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ensembles, setEnsembles] = useState<EnsembleCore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchEnsembles();
  }, []);

  const fetchEnsembles = async () => {
    try {
      const data = await ensemblesService.getAllEnsembles();
      const formattedEnsembles = data.map(ensemble => ({
        _id: ensemble._id,
        name: ensemble.name,
        description: ensemble.description,
        createdBy: ensemble.createdBy,
        members: ensemble.members
      }));
      setEnsembles(formattedEnsembles);
      setError(null);
    } catch (err) {
      setError('Failed to fetch ensembles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEnsemble = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateEnsemble = async (data: Omit<EnsembleCore, 'members'>) => {
    try {
      await ensemblesService.createEnsemble(data);
      await fetchEnsembles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating ensemble:", error);
    }
  };

  const handleJoinEnsemble = async (_id: string) => {
    try {
      if (!user) return;
      await ensemblesService.updateEnsemble(_id, {
        members: [...(ensembles.find(e => e._id === _id)?.members || []), user.id]
      });
      await fetchEnsembles();
    } catch (error) {
      console.error("Error joining ensemble:", error);
    }
  };

  const handleLeaveEnsemble = async (_id: string) => {
    try {
      if (!user) return;
      const ensemble = ensembles.find(e => e._id === _id);
      if (!ensemble) return;
      
      await ensemblesService.updateEnsemble(_id, {
        members: ensemble.members.filter(memberId => memberId !== user.id)
      });
      await fetchEnsembles();
    } catch (error) {
      console.error("Error leaving ensemble:", error);
    }
  };

  const handleDeleteEnsemble = async (_id: string) => {
    try {
      await ensemblesService.deleteEnsemble(_id);
      await fetchEnsembles();
    } catch (error) {
      console.error("Error deleting ensemble:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Ensembles</h2>
          <p className="text-lg text-gray-600">Please log in to view and manage ensembles.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Music Ensembles</h1>
            <p className="text-gray-600">Welcome, {user.firstName}!</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <EnsembleCard
              name=""
              description=""
              isAddCard={true}
              onAdd={handleAddEnsemble}
            />
            {ensembles
              .filter((ensemble): ensemble is EnsembleCore & { _id: string } => ensemble._id !== undefined)
              .map((ensemble) => (
                <EnsembleCard
                  key={ensemble._id}
                  name={ensemble.name}
                  description={ensemble.description}
                  onJoin={() => handleJoinEnsemble(ensemble._id)}
                  onLeave={() => handleLeaveEnsemble(ensemble._id)}
                  onDelete={() => handleDeleteEnsemble(ensemble._id)}
                  isCreator={ensemble.createdBy === user.id}
                  isMember={ensemble.members.includes(user.id)}
                />
              ))}
          </div>
        </div>
      </main>

      <EnsembleFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateEnsemble}
        userId={user.id}
      />
    </>
  );
};

export default EnsemblePage;
