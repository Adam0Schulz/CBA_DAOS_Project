//@ts-nocheck

import React, { useState } from "react";
import { FrontendUser, UserDetail } from "@packages/types";
import EditProfileForm from "./EditProfileForm";
import { userService } from "@/services/users.service";
import { userDetailsService } from "@/services/userDetails.service";

interface EditUserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  currentUser: FrontendUser | null;
  currentDetails: UserDetail | null;
  instruments: any[];
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentUser, 
  currentDetails,
  instruments 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !currentUser) return null;

  const handleSave = async (
    userData: Partial<FrontendUser>,
    userDetailsData: Partial<UserDetails>
  ) => {
    setIsSaving(true);
    setError(null);

    try {
      // Update user data
      await userService.updateUser(currentUser.id, userData);
      
      // Update user details
      if (currentDetails) {
        await userDetailsService.updateUserDetails(currentUser.id, userDetailsData);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <EditProfileForm
          user={currentUser}
          userDetails={currentDetails}
          instruments={instruments}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default EditUserProfile;
