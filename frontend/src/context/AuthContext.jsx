import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("TSAUser")) || {});

    const getCurrAuth = () => {
        return auth;
    }

    const setCurrAuth = (authVal) => {
        localStorage.setItem("TSAUser", JSON.stringify(authVal));
        // console.log("Auth Value", authVal);
        setAuth(authVal)
    }

    const logOut = () => {
        localStorage.removeItem("TSAUser");
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{ getCurrAuth, setCurrAuth, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}