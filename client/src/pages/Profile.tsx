import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ensemblesService } from "@/services/ensembles.service";
import { EnsembleCore } from "@packages/types";
import { format } from "date-fns";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [userEnsembles, setUserEnsembles] = useState<EnsembleCore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserEnsembles(user.id);
    }
  }, [user]);

  const fetchUserEnsembles = async (userId: string) => {
    try {
      setIsLoading(true);
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

  if (!user) {
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
            <strong>Member Since:</strong>{" "}
            {user.createdAt ? format(new Date(user.createdAt), "MMMM d, yyyy") : "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between px-6 py-4 bg-gray-50">
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
          Edit Profile
        </button>
      </div>

      {/* My Ensembles Section */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-blue-900 mb-4">My Ensembles</h2>
        {error && <p className="text-red-600">{error}</p>}
        {userEnsembles.length === 0 ? (
          <p className="text-gray-600">You haven't joined any ensembles yet.</p>
        ) : (
          <ul className="space-y-4">
            {userEnsembles.map((ensemble) => (
              <li key={ensemble._id} className="bg-gray-100 rounded-md shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-900">{ensemble.name}</h3>
                <p className="text-gray-600">{ensemble.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
