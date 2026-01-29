import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/routes/Routes";
import { toast } from "sonner";
const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme,setTheme]=useState({});
  const navigation = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setTheme(parsedUser.facultad?.theme || {}); 
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    if(userData.facultad?.theme){
      setTheme(userData.facultad.theme);
    }
  };
  const logout = () => {
    setUser(null);
    setTheme({});
    localStorage.removeItem("user");
    navigation(ROUTES.LOGIN);
    toast.success("Cierre de sesion");
  };

  return (
    <UserContext.Provider value={{ user, login, logout,theme }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
};
