
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user type
export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  isAdmin: boolean;
  grievanceCredits: number;
  lastCreditUpdate: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (mobile: string, password: string) => Promise<boolean>;
  register: (name: string, mobile: string, password: string) => Promise<boolean>;
  logout: () => void;
  requestOTP: (mobile: string) => Promise<boolean>;
  verifyOTP: (mobile: string, otp: string) => Promise<boolean>;
  resetPassword: (mobile: string, otp: string, newPassword: string) => Promise<boolean>;
  updateUserCredits: (newCredits: number) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USER: User = {
  id: "user123",
  name: "Demo User",
  mobile: "9876543210",
  email: "demo@example.com",
  isAdmin: false,
  grievanceCredits: 3,
  lastCreditUpdate: new Date().toISOString(),
};

const MOCK_ADMIN: User = {
  id: "admin123",
  name: "Admin User",
  mobile: "9876543211",
  email: "admin@example.com",
  isAdmin: true,
  grievanceCredits: 999,
  lastCreditUpdate: new Date().toISOString(),
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Handle user login
  const login = async (mobile: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock authentication logic
      if (mobile === "9876543210" && password === "password") {
        setUser(MOCK_USER);
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        return true;
      } else if (mobile === "9876543211" && password === "admin") {
        setUser(MOCK_ADMIN);
        localStorage.setItem("user", JSON.stringify(MOCK_ADMIN));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user registration
  const register = async (name: string, mobile: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call to register
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock registration success
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        mobile,
        isAdmin: false,
        grievanceCredits: 3,
        lastCreditUpdate: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Request OTP for password reset
  const requestOTP = async (mobile: string): Promise<boolean> => {
    try {
      // In a real app, this would send an OTP to the user's phone
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      return true;
    } catch (error) {
      console.error("OTP request error:", error);
      return false;
    }
  };

  // Verify OTP
  const verifyOTP = async (mobile: string, otp: string): Promise<boolean> => {
    try {
      // In a real app, this would verify the OTP
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock verification - any 6 digit code will work
      return otp.length === 6 && /^\d+$/.test(otp);
    } catch (error) {
      console.error("OTP verification error:", error);
      return false;
    }
  };

  // Reset password
  const resetPassword = async (mobile: string, otp: string, newPassword: string): Promise<boolean> => {
    try {
      // In a real app, this would reset the password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      return false;
    }
  };

  // Update user grievance credits
  const updateUserCredits = (newCredits: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        grievanceCredits: newCredits,
        lastCreditUpdate: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = !!user;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    requestOTP,
    verifyOTP,
    resetPassword,
    updateUserCredits,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
