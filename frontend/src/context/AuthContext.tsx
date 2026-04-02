import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (userData: any) => {
    setUser(userData);

  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};