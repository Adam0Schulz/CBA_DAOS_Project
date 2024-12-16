import React, { useEffect, useState } from "react";
import { User, UserDetail } from "@packages/types";
import { userDetailsService } from "@/services/userDetails.service";
import EditProfileForm from "./EditProfileForm";

interface EditUserProfileProps {
  user: User;
  onClose: () => void;
  onSave: (data: {
    userData: Partial<User>;
    userDetailsData: Partial<Omit<UserDetail, "_id" | "userId">>;
  }) => void;
  isSaving: boolean;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({
  user,
  onClose,
  onSave,
  isSaving,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await userDetailsService.getUserDetails(user.id);
      setUserDetails(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              Close
            </button>
          </div>

          <EditProfileForm
            user={user}
            userDetails={userDetails}
            onSave={onSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
