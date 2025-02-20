// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

import apiClient from "../services/apiClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get("/user/details");
        console.log(response.data);
        
        if (response.data) {
          setUser(response.data);
          setLoggedIn(true);
        } else {
          setUser(null);
          setLoggedIn(false);
        }
      } catch (error) {
        setUser(null);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [loggedIn,setLoading]);

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  return (
    <UserContext.Provider
      value={{ user, loggedIn, setLoggedIn, isAdmin, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
