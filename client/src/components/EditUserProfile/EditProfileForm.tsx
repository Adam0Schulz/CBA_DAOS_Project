import React, { useEffect, useState } from "react";
import { Instrument, instrumentsService } from "@/services/instruments.service";
import { User, UserDetail } from "@packages/types";

interface EditProfileFormProps {
  user: User;
  userDetails: UserDetail | null;
  onSave: (data: {
    userData: Partial<User>;
    userDetailsData: Partial<Omit<UserDetail, "_id" | "userId">>;
  }) => void;
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
    instrumentId: userDetails?.instrumentId || "",
    isOpenToWork: userDetails?.isOpenToWork || false,
    address: userDetails?.address || "",
    description: userDetails?.description || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = async () => {
    try {
      const data = await instrumentsService.getAllInstruments();
      setInstruments(data);
    } catch (error) {
      console.error("Failed to fetch instruments:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData: Partial<User> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      ...(formData.newPassword && {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
    };

    const userDetailsData: Partial<Omit<UserDetail, "_id" | "userId">> = {
      instrumentId: formData.instrumentId,
      isOpenToWork: formData.isOpenToWork,
      address: formData.address,
      description: formData.description,
    };

    onSave({ userData, userDetailsData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Instrument */}
      <div>
        <label>Instrument</label>
        <select
          name="instrumentId"
          value={formData.instrumentId}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select an instrument</option>
          {instruments.map((instrument) => (
            <option key={instrument._id} value={instrument._id}>
              {instrument.name}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Details */}
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Password Fields */}
      <div>
        <label>New Password</label>
        <input
          type={passwordVisibility.new ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input
          type={passwordVisibility.confirm ? "text" : "password"}
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
