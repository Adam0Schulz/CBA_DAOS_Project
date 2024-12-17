import React, { useState } from "react";
import { User } from "@packages/types";
import EditProfileForm from "./EditProfileForm";
import { userService } from "@/services/users.service";

interface EditUserProfileProps {
  user: User;
  setUser: (updatedUser: User) => void; 
  onClose: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, setUser, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (userData: Partial<User>) => {
    setIsSaving(true);
    setError(null);

    try {
      const updatedUser = await userService.updateUser(user.id, userData);
      setUser(updatedUser); 
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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

          <EditProfileForm user={user} onSave={handleSave} isSaving={isSaving} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
