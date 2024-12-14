const API_URL = 'http://localhost:3000/api';

export interface UserDetails {
  _id: string;
  userId: string;
  address: string;
  description: string;
}

export const userDetailsService = {
  async getUserDetails(userId: string): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details/${userId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },

  async createUserDetails(userId: string, data: Omit<UserDetails, '_id' | 'userId'>): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...data, userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to create user details: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error creating user details:', error);
      throw error;
    }
  },

  async updateUserDetails(userId: string, data: Partial<Omit<UserDetails, '_id' | 'userId'>>): Promise<UserDetails> {
    try {
      const response = await fetch(`${API_URL}/user-details/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
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
      const response = await fetch(`${API_URL}/user-details/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to delete user details: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user details:', error);
      throw error;
    }
  },
};
