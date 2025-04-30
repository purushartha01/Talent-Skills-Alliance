import Login from '@/components/custom/Login';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

// TODO: Make sure that the page redirects on successful login
    const user = useContext(AuthContext).getCurrAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User in LoginPage: ", user);
        if (Object.keys(user).length > 0) {
            if (window.history.length > 2) {
                navigate(-1);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [user, navigate])


    return (
        <Login />
    )
}

export default LoginPage