import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("TSAUser")) || null);

    const getCurrAuth = () => {
        return auth;
    }

    const setCurrAuth = (authVal) => {
        localStorage.setItem("TSAUser", JSON.stringify(authVal));
        // console.log("Auth Value", authVal);
        setAuth(authVal)
    }
    return (
        <AuthContext.Provider value={{ getCurrAuth, setCurrAuth }}>
            {children}
        </AuthContext.Provider>
    );
}