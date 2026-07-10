import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/routes/Routes";
import { toast } from "sonner";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setTheme(parsedUser?.facultad?.theme || {});
      } catch (error) {
        console.error("Error al leer el usuario desde localStorage:", error);
        localStorage.removeItem("user");
        setUser(null);
        setTheme({});
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setTheme(user?.facultad?.theme || {});
    } else {
      localStorage.removeItem("user");
      setTheme({});
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setTheme(userData?.facultad?.theme || {});
  };

  const logout = () => {
    setUser(null);
    setTheme({});
    localStorage.removeItem("user");

    navigate(ROUTES.LOGIN);
    toast.success("Cierre de sesión");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, theme }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
};