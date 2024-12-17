import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ensemblesService } from "@/services/ensembles.service";
import { instrumentsService } from "@/services/instruments.service";
import { EnsembleCore } from "@packages/types";
import { format } from "date-fns";
import EditUserProfile from "@/components/EditUserProfile/EditUserProfile";
import type { Instrument } from "@/services/instruments.service";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  instrumentId?: string;
  isOpenToWork: boolean;
  createdAt: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  isOpenToWork: boolean;
  instrumentId?: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userEnsembles, setUserEnsembles] = useState<EnsembleCore[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        instrumentId: decoded.instrumentId,
        isOpenToWork: decoded.isOpenToWork,
        createdAt: decoded.createdAt
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      Promise.all([
        fetchUserEnsembles(user.id),
        fetchInstruments()
      ]).catch(console.error);
    }
  }, [user]);

  const fetchUserEnsembles = async (userId: string) => {
    try {
      const allEnsembles = await ensemblesService.getAllEnsembles();
      const filteredEnsembles = allEnsembles.filter((ensemble) =>
        ensemble.members.includes(userId)
      );
      setUserEnsembles(filteredEnsembles);
      setError(null);
    } catch (err) {
      setError("Failed to load your ensembles.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInstruments = async () => {
    try {
      const allInstruments = await instrumentsService.getAllInstruments();
      setInstruments(allInstruments);
    } catch (err) {
      console.error("Failed to load instruments:", err);
    }
  };

  const getCurrentInstrumentName = () => {
    if (!user?.instrumentId) return "Not selected";
    const instrument = instruments.find((i) => i._id === user.instrumentId);
    return instrument ? instrument.name : "Unknown instrument";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            You are not logged in
          </h1>
          <p className="text-gray-600 mt-2">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-md">
      {/* Profile Information */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-red-600">Profile</h1>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Instrument:</strong> {getCurrentInstrumentName()}
          </p>
          <p>
            <strong>Available for Ensembles:</strong>{" "}
            <span className={user.isOpenToWork ? "text-green-600" : "text-red-600"}>
              {user.isOpenToWork ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <strong>Member Since:</strong>{" "}
            {user.createdAt ? format(new Date(user.createdAt), "MMMM d, yyyy") : "N/A"}
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* My Ensembles Section */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Ensembles</h2>
        {error && <p className="text-red-600">{error}</p>}
        {userEnsembles.length === 0 ? (
          <p className="text-gray-600">You haven't joined any ensembles yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {userEnsembles.map((ensemble) => (
              <div
                key={ensemble._id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">{ensemble.name}</h3>
                <p className="text-gray-600">{ensemble.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditUserProfile
          user={user}
          setUser={setUser}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
