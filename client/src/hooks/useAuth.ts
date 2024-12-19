import { FrontendUser } from '@packages/types';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDetails, userDetailsService } from '@/services/userDetails.service';

interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<FrontendUser | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        createdAt: decoded.createdAt
      });
      console.log('Decoded token:', decoded);
    }
  }, []);

  const fetchUserDetails = async (id: string) => {
    const userDet = await userDetailsService.getUserDetails(id)
    setUserDetails(userDet)
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserDetails(user.id)
    }
  }, [user])

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { isAuthenticated, user, userDetails, logout, fetchUserDetails };
};
