const API_URL = 'http://localhost:3000/api';

export interface Instrument {
  _id: string;
  name: string;
  type: string;
  description?: string;
}

export const instrumentsService = {
  async getAllInstruments(): Promise<Instrument[]> {
    try {
      const response = await fetch(`${API_URL}/instruments`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch instruments: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching instruments:', error);
      throw error;
    }
  },

  async updateInstrument(id: string, data: Partial<Instrument>): Promise<Instrument> {
    try {
      const response = await fetch(`${API_URL}/instruments/${id}`, {
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
        throw new Error(`Failed to update instrument: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error updating instrument:', error);
      throw error;
    }
  },
};
