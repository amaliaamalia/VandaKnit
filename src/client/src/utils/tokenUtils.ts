import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (token: string | null) => {
    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            return decodedToken?.role || null;
        } catch (error) {
            return null;
        }
    }
    return null;
};

export const getUserIdFromToken = (token: string | null) => {
    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            return decodedToken?.userId || null;
        } catch (error) {
            return null;
        }
    }
    return null;
};
