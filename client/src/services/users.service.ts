const API_URL = 'http://localhost:3000/api/users';

export const userService = {
  async getUserProfile(token: string) {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
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

    return response.json();
  },
  async getAllUsers() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await fetch(`${API_URL}`, {
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
};
