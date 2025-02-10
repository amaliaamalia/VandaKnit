import { jwtDecode } from 'jwt-decode';
import { User } from '../types/User';

export const getRoleFromToken = (token: string | null) : string | null => {
  if (token) {
    try {
      const decodedToken: User = jwtDecode(token);

      return decodedToken?.Role || null;
    } catch {
      return null;
    }
  }
  return null;
};

export const getUserIdFromToken = (token: string | null) : string | null => {
  if (token) {
    try {
      const decodedToken: User = jwtDecode(token);
      return decodedToken?.UserId || null;
    } catch {
      return null;
    }
  }
  return null;
};