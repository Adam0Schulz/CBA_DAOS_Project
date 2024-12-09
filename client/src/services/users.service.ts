import { User } from '@packages/types';

const API_URL = 'http://localhost:3000/api/users';

export const userService = {
  async getUserProfile(userId: string): Promise<User> {
    const response = await fetch(`${API_URL}/profile/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }
    return response.json();
  },
};
