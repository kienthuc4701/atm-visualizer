import { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '@/services/api';
import { deleteCookie, getCookie, setCookie } from '@/lib/utils';

// Define the structure of the authentication context
interface AuthContextType {
  token: string | null;
  login: (cardNumber: string, pin: string) => Promise<void>;
  logout: () => void;
  
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your app with authentication logic
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState<string | null>(null);

  // Effect to check for existing token in cookies on initial render
  useEffect(() => {
    const storedToken = getCookie('atm-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to handle user login
  const handleLogin = async (cardNumber: string, pin: string) => {
    try {
      // Call the login API and set the token in state and cookies on success
      const response = await apiLogin(cardNumber, pin);
      setToken(response.token);
      setCookie('atm-token', response.token);
    } catch (error) {
      // Handle any login errors
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear the token from state and cookies
    setToken(null);
    deleteCookie('atm-token');
  };

  return (
    // Provide the authentication context to child components
    <AuthContext.Provider value={{ token, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to simplify access to the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) 
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
