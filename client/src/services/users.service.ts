import { User } from '@packages/types';

const API_URL = 'http://localhost:3000/api/users';

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  instrumentId?: string;
  isOpenToWork?: boolean;
  password?: string;
}

export const userService = {
  async getUserProfile(userId: string): Promise<User> {
    const response = await fetch(`${API_URL}/profile/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }
    return response.json();
  },

  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return response.json();
  },
};
