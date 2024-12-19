import React, { useEffect, useState } from "react";
import { MusicianWithInstrument } from "@packages/types";
import { userService } from "@/services/users.service";
import { userDetailsService } from "@/services/userDetails.service";
import { instrumentsService, Instrument } from "@/services/instruments.service";
import { MusicianCard } from "@/components/MusicianCard";
import { User, UserDetail } from "@packages/types";
import { useAuth } from "@/hooks/useAuth";

const ITEMS_PER_PAGE = 9;

const MusiciansPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [musicians, setMusicians] = useState<MusicianWithInstrument[]>([]);
  const [filteredMusicians, setFilteredMusicians] = useState<MusicianWithInstrument[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, userDetails, instrumentsList] = await Promise.all([
          userService.getAllUsers(),
          userDetailsService.getAllUserDetails(),
          instrumentsService.getAllInstruments()
        ]);

        setInstruments(instrumentsList);

        const combinedData = users.map((user: User) => {
          const details = userDetails.find((detail: UserDetail) => detail.userId === user._id);
          const instrument = details?.instrumentId
            ? instrumentsList.find(i => i._id === details.instrumentId)
            : undefined;

          return {
            ...user,
            details,
            instrumentName: instrument?.name
          };
        });

        setMusicians(combinedData);
        setFilteredMusicians(combinedData);
      } catch (error) {
        console.error('Error fetching musicians:', error);
        setError('Failed to load musicians');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = musicians.filter((musician) => {
      const searchString = searchTerm.toLowerCase();
      const matchesSearch =
        musician.firstName.toLowerCase().includes(searchString) ||
        musician.lastName.toLowerCase().includes(searchString) ||
        musician.email.toLowerCase().includes(searchString) ||
        musician.details?.description?.toLowerCase().includes(searchString) ||
        musician.instrumentName?.toLowerCase().includes(searchString);

      const matchesInstrument = !selectedInstrument || musician.instrumentName === selectedInstrument;
      const matchesOpenToWork = !openToWorkOnly || (musician.details?.isOpenToWork ?? false);

      return matchesSearch && matchesInstrument && matchesOpenToWork;
    });
    setFilteredMusicians(filtered);
  }, [searchTerm, selectedInstrument, openToWorkOnly, musicians]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            You are not logged in
          </h1>
          <p className="text-gray-600 mt-2">Please log in to view the musicians.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8 mt-20">
        <div className="text-xl text-center text-gray-600">Loading musicians...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8 mt-20">
        <div className="text-xl text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredMusicians.length / ITEMS_PER_PAGE);
  const paginatedMusicians = filteredMusicians.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-8 py-8 mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Musicians</h1>
        <div className="mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search musicians..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Instruments</option>
              {instruments.map((instrument) => (
                <option key={instrument._id} value={instrument.name}>
                  {instrument.name}
                </option>
              ))}
            </select>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="openToWork"
                checked={openToWorkOnly}
                onChange={(e) => setOpenToWorkOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="openToWork" className="ml-2 text-gray-700">
                Show only open to work
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMusicians.map((musician) => (
          <MusicianCard key={musician._id.toString()} musician={musician} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                pageNum === page
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusiciansPage;
