import { useContext } from "react";
import { createContext, useState } from "react";

 const AuthContext=createContext();

export const AuthProvider=({ children})=>{
    const [user,setUser]=useState(()=>{
        const storedUser=localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null; 
    });

    const login=(userData)=>{
        localStorage.setItem("token",userData.token);
        localStorage.setItem("user",JSON.stringify(userData));

        setUser(userData);
    };

    const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
};

    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const isAuthenticated=!!user;

    return (
        <AuthContext.Provider 
        value={{
            user,
            login,
            updateUser,
            logout,
            isAuthenticated
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// This hook is intentionally exported with the provider for the existing public API.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth= () => {
    return useContext(AuthContext);
}