//@ts-nocheck

import React, { useState, useEffect } from "react";
import { FrontendUser, UserDetail } from "@packages/types";
import { Types } from "mongoose";
import { instrumentsService, Instrument } from "../../services/instruments.service";

interface EditProfileFormProps {
  user: FrontendUser;
  userDetails: UserDetail;
  onSave: (userData: Partial<FrontendUser>, userDetails: Partial<UserDetail>) => void;
  isSaving: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  userDetails,
  onSave,
  isSaving,
}) => {
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

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const data = await instrumentsService.getAllInstruments();
        setInstruments(data);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Instrument</label>
        <select
          name="instrumentId"
          value={formData.instrumentId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an instrument</option>
          {instruments.map((instrument) => (
            <option key={instrument._id} value={instrument._id}>
              {instrument.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isOpenToWork"
          name="isOpenToWork"
          checked={formData.isOpenToWork}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isOpenToWork" className="ml-2 block text-sm text-gray-700">
          Open to Work
        </label>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
