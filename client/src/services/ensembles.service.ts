import { EnsembleCore, EnsembleIn } from '@packages/types';

const API_URL = 'http://localhost:3000/api';

export const ensemblesService = {
  async getAllEnsembles(): Promise<EnsembleCore[]> {
    try {
      const response = await fetch(`${API_URL}/ensembles`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch ensembles: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  async createEnsemble(data: Omit<EnsembleIn, 'positions'>): Promise<EnsembleCore> {
    try {
      const response = await fetch(`${API_URL}/ensembles`, {
        method: 'POST',
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
        throw new Error(`Failed to create ensemble: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  async updateEnsemble(id: string, data: Partial<EnsembleCore>): Promise<EnsembleCore> {
    try {
      const response = await fetch(`${API_URL}/ensembles/${id}`, {
        method: 'PUT',
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
        throw new Error(`Failed to update ensemble: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  async deleteEnsemble(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/ensembles/${id}`, {
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
        throw new Error(`Failed to delete ensemble: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  async getEnsemblesByUser(userId: string): Promise<EnsembleCore[]> {
    try {
      const response = await fetch(`${API_URL}/ensembles/user/${userId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to fetch user ensembles: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },
  async getEnsembleById(id: string): Promise<EnsembleCore> {
    try {
      const response = await fetch(`${API_URL}/ensembles/${id}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error details:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch ensemble: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  async sendPositionApplication(positionId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          positionId: positionId,
          userId: "000",
          message: "Hello Application",
          createdAt: Date.now()
        })
      });
      if (!response.ok) {
        throw new Error('Failed to send application');
      }
    } catch (error) {
      console.error('Error sending application:', error);
      throw error;
    }
  }
};
