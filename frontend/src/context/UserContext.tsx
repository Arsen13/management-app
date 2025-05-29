import { createContext, useContext, useState, type ReactNode } from "react";
import { getItem } from "../lib/localStorage.helper";

interface UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  user: UserI | undefined;
  setUser: (user: UserI) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserI>(() => {
    const userData = getItem("user");
    return userData ? JSON.parse(userData) : undefined;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User context not provided");
  }

  return context;
};
