import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ensemblesService } from "@/services/ensembles.service";
import { instrumentsService } from "@/services/instruments.service";
import { userDetailsService } from "@/services/userDetails.service";
import { EnsembleCore } from "@packages/types";
import { FrontendUser } from "@packages/types";
import { format } from "date-fns";
import EditUserProfile from "@/components/EditUserProfile/EditUserProfile";
import type { Instrument } from "@/services/instruments.service";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<FrontendUser | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userEnsembles, setUserEnsembles] = useState<EnsembleCore[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        createdAt: decoded.createdAt
      });
      console.log('Decoded token:', decoded);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      Promise.all([
        fetchUserEnsembles(user.id),
        fetchInstruments(),
        fetchUserDetails(user.id)
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

  const fetchUserDetails = async (userId: string) => {
    try {
      const details = await userDetailsService.getUserDetails(userId);
      setUserDetails(details);
    } catch (err) {
      console.error("Failed to load user details:", err);
    }
  };

  const getCurrentInstrumentName = () => {
    if (!userDetails?.instrumentId) return "Not selected";
    const instrument = instruments.find((i) => i._id === userDetails.instrumentId);
    return instrument ? instrument.name : "Unknown instrument";
  };

  const handleSaveProfile = async () => {
    if (user) {
      await fetchUserDetails(user.id);
    }
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
    <div className="container mx-auto px-8 py-8 mt-20">
      <div className="bg-white shadow-md rounded-lg">
        {/* Profile Information */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900">Profile</h1>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium w-28">Name:</span>
                    <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-28">Email:</span>
                    <span className="text-gray-700">{user?.email}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-28">Instrument:</span>
                    <span className="text-gray-700">{getCurrentInstrumentName()}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-28">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      userDetails?.isOpenToWork 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userDetails?.isOpenToWork ? 'Open to Work' : 'Not Available'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Additional Details</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium block mb-1">Address:</span>
                    <p className="text-gray-700">{userDetails?.address || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Description:</span>
                    <p className="text-gray-700">{userDetails?.description || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg h-fit">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">My Ensembles</h2>
              {userEnsembles.length > 0 ? (
                <div className="space-y-3">
                  {userEnsembles.map((ensemble) => (
                    <div key={ensemble._id} className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-gray-800">{ensemble.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{ensemble.description || 'No description'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You are not a member of any ensembles yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditUserProfile
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        currentUser={user}
        currentDetails={userDetails}
        instruments={instruments}
      />
    </div>
  );
};

export default ProfilePage;
