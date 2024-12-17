// @/types/frontendUser.ts
export interface FrontendUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
  }
  
  // If you need UserDetail on the frontend:
  export interface FrontendUserDetail {
    _id: string;
    userId: string;
    address?: string;
    description?: string;
    instrumentId?: string;
    isOpenToWork: boolean;
    lastLoggedIn?: Date | null;
  }
  