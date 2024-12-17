import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import EditUserProfile from "@/components/EditUserProfile/EditUserProfile";
import { format } from "date-fns";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthenticated) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        instrumentId: decoded.instrumentId,
        isOpenToWork: decoded.isOpenToWork,
        createdAt: decoded.createdAt,
      });
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-red-600">Profile</h1>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Name:</strong> {user?.firstName} {user?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Member Since:</strong>{" "}
            {user?.createdAt ? format(new Date(user.createdAt), "MMMM d, yyyy") : "N/A"}
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && user && (
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
