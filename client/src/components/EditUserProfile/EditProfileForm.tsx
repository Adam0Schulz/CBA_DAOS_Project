//@ts-nocheck

import React, { useState, useEffect } from "react";
import { FrontendUser, UserDetail } from "@packages/types";
import { Types } from "mongoose";
import { instrumentsService, Instrument } from "../../services/instruments.service";
import { userService } from "../../services/users.service";
import { userDetailsService } from "../../services/userDetails.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAuthHeader } from '../../utils/auth';
import { useAuth } from '../../hooks/useAuth';

interface EditProfileFormProps {
  user: FrontendUser;
  userDetails: UserDetail | null;
  onSave: (userData: Partial<FrontendUser>, userDetailsData: Partial<UserDetail>) => void;
  isSaving: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  userDetails,
  onSave,
  isSaving,
}) => {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: userDetails?.address || "",
    description: userDetails?.description || "",
    isOpenToWork: userDetails?.isOpenToWork || false,
    instrumentId: userDetails?.instrumentId || "",
  });

  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const fetchedInstruments = await instrumentsService.getAllInstruments();
        setInstruments(fetchedInstruments);
      } catch (error) {
        console.error('Failed to fetch instruments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, ...userDetailsData } = formData;
    
    // Convert instrumentId to ObjectId if it exists and is a string
    const processedUserDetails = {
      ...userDetailsData,
      instrumentId: userDetailsData.instrumentId 
        ? (typeof userDetailsData.instrumentId === 'string' 
          ? new Types.ObjectId(userDetailsData.instrumentId) 
          : userDetailsData.instrumentId)
        : undefined
    };

    onSave(
      { firstName, lastName, email },
      processedUserDetails
    );
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the main form from submitting
    setPasswordError(null);
    setSuccessMessage(null);

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Check password length
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Check if new password is same as old
    if (passwordData.oldPassword === passwordData.newPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
    const hasNumber = /[0-9]/.test(passwordData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      // Show success message
      setSuccessMessage(data.message);

      // Clear form and close after delay
      setTimeout(() => {
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        setShowChangePassword(false);
        setSuccessMessage(null);
      }, 2000);

    } catch (error: any) {
      setPasswordError(error.message);
    }
  };

  return (
    <div>
      {!showChangePassword ? (
        // Profile Form
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                hover:border-slate-400 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                hover:border-slate-400 transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              hover:border-slate-400 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              hover:border-slate-400 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              hover:border-slate-400 transition-colors duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instrument</label>
            <select
              name="instrumentId"
              value={formData.instrumentId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              hover:border-slate-400 transition-colors duration-200"
            >
              <option value="">Select an instrument</option>
              {instruments.map((instrument) => (
                <option key={instrument._id} value={instrument._id}>
                  {instrument.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isOpenToWork"
              checked={formData.isOpenToWork}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
              hover:border-slate-400 transition-colors duration-200 cursor-pointer"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Open to join ensembles
            </label>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowChangePassword(true)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Change Password
            </button>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        // Password Change Form
        <div className="space-y-4">
          {passwordError && (
            <div className="p-2 text-sm text-red-700 bg-red-100 rounded">
              {passwordError}
            </div>
          )}

          {successMessage && (
            <div className="p-2 text-sm text-green-700 bg-green-100 rounded">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  hover:border-slate-400 transition-colors duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={showOldPassword ? faEyeSlash : faEye}
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  hover:border-slate-400 transition-colors duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  hover:border-slate-400 transition-colors duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswordError(null);
                  setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                  });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
