import { ApplicationCore } from '@packages/types';
import { getAuthHeader } from '../utils/auth';
import { Types } from 'mongoose';

const API_URL = 'http://localhost:3000/api';

export interface UserDetails {
  _id: string;
  userId: string;
  address?: string;
  description?: string;
  instrumentId?: string;
  applicationId?: ApplicationCore
  isOpenToWork: boolean;
}

const ensureObjectId = (id: string) => {
  try {
    return new Types.ObjectId(id).toString();
  } catch {
    // If the ID is not in the correct format, return it as is
    // The backend will handle the error appropriately
    return id;
  }
};

export const userDetailsService = {
  async getUserDetails(userId: string): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details/${ensureObjectId(userId)}`, {
        headers: {
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return {
        _id: data._id,
        userId: data.userId,
        address: data.address || '',
        description: data.description || '',
        instrumentId: data.instrumentId || '',
        isOpenToWork: data.isOpenToWork || false,
        applicationId: data.applicationId
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },

  async getAllUserDetails() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(`${API_URL}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Get All User Details Error:", errorText);
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }

    return response.json();
  },

  async createUserDetails(
    userId: string,
    data: Omit<UserDetails, '_id' | 'userId'>
  ): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ ...data, userId: ensureObjectId(userId) }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to create user details: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error creating user details:', error);
      throw error;
    }
  },

  async updateUserDetails(
    userId: string,
    data: Partial<Omit<UserDetails, '_id' | 'userId'>>
  ): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details/${ensureObjectId(userId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to update user details: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  },

  async deleteUserDetails(userId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/user-details/${ensureObjectId(userId)}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to delete user details: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user details:', error);
      throw error;
    }
  }
};
