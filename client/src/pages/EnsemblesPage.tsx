import React, { useState, useEffect } from "react";
import EnsembleCard from "@/components/EnsembleCards";
import EnsembleFormModal from "@/components/EnsembleFormModal";
import Switch from "@/components/Switch";
import { useAuth } from "@/hooks/useAuth";
import { EnsembleCore, EnsembleIn } from "@packages/types";
import { ensemblesService } from "@/services/ensembles.service";

const EnsemblePage: React.FC = () => {
  const [ensembles, setEnsembles] = useState<EnsembleCore[]>([]);
  const [filteredEnsembles, setFilteredEnsembles] = useState<EnsembleCore[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "myEnsembles" | "others">("all");
  const [showCompleteEnsembles, setShowCompleteEnsembles] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEnsembles();
  }, []);

  useEffect(() => {
    // Filter logic
    let filtered = ensembles;

    if (filterType === "myEnsembles" && user) {
      filtered = ensembles.filter((ensemble) => ensemble.positions.find(pos => pos.userId===user.id));
    } else if (filterType === "others" && user) {
      filtered = ensembles.filter((ensemble) => !ensemble.positions.find(pos => pos.userId===user.id));
    }

    if (showCompleteEnsembles) {
      filtered = filtered.filter((ensemble) => 
        ensemble.positions.every(position => position.userId)
      );
    } else {
      filtered = filtered.filter((ensemble) => 
        ensemble.positions.some(position => !position.userId)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((ensemble) =>
        ensemble.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEnsembles(filtered);
  }, [ensembles, searchQuery, filterType, showCompleteEnsembles, user]);

  const fetchEnsembles = async () => {
    try {
      const data = await ensemblesService.getAllEnsembles();
      setEnsembles(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch ensembles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEnsemble = () => {
    setIsModalOpen(true);
  };

  const handleCreateEnsemble = async (data: Omit<EnsembleIn, "positions">) => {
    try {
      await ensemblesService.createEnsemble(data);
      await fetchEnsembles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating ensemble:", error);
    }
  };

  const handleDeleteEnsemble = async (ensembleId: string) => {
    try {
      await ensemblesService.deleteEnsemble(ensembleId);
      await fetchEnsembles();
    } catch (error) {
      console.error("Error deleting ensemble:", error);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white pt-20">
        {/* Filter Section */}
        <div className="bg-white pt-16 pb-12 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Ensembles</h1>
              <p className="text-gray-600 mb-6">{filteredEnsembles.length} result{filteredEnsembles.length !== 1 ? 's' : ''} found</p>

              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search ensembles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                />

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as never)}
                  className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Ensembles</option>
                  <option value="myEnsembles">My Ensembles</option>
                  <option value="others">Other Ensembles</option>
                </select>

                <div className="w-full sm:w-auto">
                  <Switch
                    isChecked={showCompleteEnsembles}
                    onToggle={() => setShowCompleteEnsembles(!showCompleteEnsembles)}
                    leftLabel="Incomplete"
                    rightLabel="Complete"
                  />
                </div>

                <button
                  onClick={handleAddEnsemble}
                  className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                  Add New Ensemble
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ensembles List Section */}
        <div className="bg-[#F4F5F4] py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEnsembles.map((ensemble) => (
                <EnsembleCard
                  key={ensemble._id}
                  name={ensemble.name}
                  description={ensemble.description}
                  onDelete={() => handleDeleteEnsemble(ensemble._id || "")}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <EnsembleFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateEnsemble}
        userId={user?.id || ""}
      />
    </>
  );
};

export default EnsemblePage;
