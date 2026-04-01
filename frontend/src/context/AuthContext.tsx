import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (userData: any) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 this is useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};