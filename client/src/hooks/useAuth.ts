import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
    
      if (!parsedUser.createdAt) {
        console.warn('createdAt is missing or invalid');
      } else {
        parsedUser.createdAt = new Date(parsedUser.createdAt); 
      }
  
      setIsAuthenticated(true);
      setUser(parsedUser);
    }
  }, []);
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };
  return { isAuthenticated, user, logout };
};
