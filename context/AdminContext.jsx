import { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
