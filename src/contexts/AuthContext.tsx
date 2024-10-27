import { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '@/services/api';

// Define the structure of the authentication context
interface AuthContextType {
  login: (cardNumber: string, pin: string) => Promise<void>;
  logout: () => void;
  isAuthorized:boolean;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your app with authentication logic
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to store the authentication token
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  // Function to handle user login
  const handleLogin = async (cardNumber: string, pin: string) => {
    try {
      // Call the login API and set the token in state and cookies on success
      await apiLogin(cardNumber, Number.parseInt(pin));
      setIsAuthorized(true);
    } catch (error) {
      // Handle any login errors
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear the token from state and cookies
    // call api logout
    setIsAuthorized(false);
  };

  return (
    // Provide the authentication context to child components
    <AuthContext.Provider value={{ isAuthorized, login: handleLogin, logout: handleLogout }}>
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
