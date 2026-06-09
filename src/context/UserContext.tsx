import React, { createContext, useState, useContext } from 'react';

type Address = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

type AuthUser = {
  id: string;
  phone: string;
  role: string;
  status: string;
  name: string | null;
  email: string | null;
  avatarUrl?: any;
};

type UserContextType = {
  address: Address;
  updateAddress: (newAddress: Address) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<Address>({
    fullName: 'John Doe',
    phone: '+1 (555) 0123-4567',
    street: '123 Elite Ranch Road',
    city: 'Austin',
    state: 'Texas',
    zip: '78701',
  });

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateAddress = (newAddress: Address) => {
    setAddress(newAddress);
  };

  return (
    <UserContext.Provider value={{ address, updateAddress, user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
