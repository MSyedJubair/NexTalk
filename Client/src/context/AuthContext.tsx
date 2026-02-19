import { getUser } from "@/lib/api";
import AxiosInstance from "@/lib/axios";
import React, { createContext, useState } from "react";

const USER = {
  fullname: "",
  email: "",
};

const INITIAL_STATE = {
  USER,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

export const AuthContextProvider = createContext(INITIAL_STATE);

export const AuthContext = (children: React.ReactNode) => {
  const [user, setSser] = useState(USER)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthUser = async () => {
    setLoading(true)
    try {
        const status = await getUser()
        return status

    } catch (error) {
        console.log(error);
        return false
        
    } finally {
        setLoading(false)
    }
  }


  return <AuthContextProvider.Provider value={}>{children}</AuthContextProvider.Provider>;
};

 
