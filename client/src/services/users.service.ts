import { getAuthHeader } from '../utils/auth';

const API_URL = 'http://localhost:5000/users';

export const userService = {
  async getUserProfile(token: string) {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  async getAllUsers() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Get All Users Error:", errorText);
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return response.json();
  },

  async getUserById(userId: string) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Get User Error:", errorText);
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  },

  async updateUser(userId: string, updatedData: Partial<{ firstName: string; lastName: string; email: string }>) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update User Error:", errorText);
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Update token in local storage
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    return result.user;
  },

  async deleteAccount(userId: string) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete account');
    }

    return response.json();
  }
};
