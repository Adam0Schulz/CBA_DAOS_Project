import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FrontendUser, UserDetail } from "@packages/types";
import EditProfileForm from "./EditProfileForm";
import { userService } from "@/services/users.service";
import { userDetailsService } from "@/services/userDetails.service";

interface EditUserProfileProps {
  user: FrontendUser;
  setUser: Dispatch<SetStateAction<FrontendUser | null>>;
  onClose: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, setUser, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await userDetailsService.getUserDetails(user.id);
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to load user details");
      }
    };

    fetchUserDetails();
  }, [user.id]);

  const handleSave = async (
    userData: Partial<FrontendUser>,
    userDetailsData: Partial<UserDetail>
  ) => {
    setIsSaving(true);
    setError(null);

    try {
      // Update user data
      const updatedUser = await userService.updateUser(user.id, userData);
      
      // Update user details
      if (userDetails) {
        const updatedUserDetails = await userDetailsService.updateUserDetails(user.id, userDetailsData);
        setUserDetails(updatedUserDetails);
      }

      setUser(updatedUser);
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!userDetails && !error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
          <div className="p-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              Close
            </button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {userDetails && (
            <EditProfileForm
              user={user}
              userDetails={userDetails}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
