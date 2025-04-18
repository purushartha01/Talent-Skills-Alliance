import { createBrowserRouter } from 'react-router-dom'
import Home from './../pages/Home';
import PageLayout from '@/components/custom/PageLayout';
import Login from '@/components/custom/Login';
import Signup from '@/components/custom/Signup';
import Explore from '@/pages/Explore';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import NotFound from '@/pages/NotFound';
import UserProfile from '@/pages/UserProfile';
import Settings from '@/pages/Settings';


const useMyRouter = () => {

    const { getCurrAuth } = useContext(AuthContext);

    const routes = [
        {
            path: "*",
            element: <NotFound />
        },
        {
            path: '/',
            element: <Home />
        }, {
            path: '/login',
            element: <Login />
        }, {
            path: '/signup',
            element: <Signup />
        },
    ];

    const protectedRoutes = [
        {
            path: '/explore',
            element: <Explore />,
        },
        {
            path: '/user',
            children: [
                {
                    path: '/user/profile',
                    element: <UserProfile />,
                },{
                    path: '/user/settings',
                    element: <Settings />,
                }
            ]
        }
    ];



    //TODO: Add conditional rendering for protected routes based on authentication status
    const finalRoutes = [{
        element: <PageLayout />,
        children: [...routes, ...(Object.keys(getCurrAuth()).length > 0 ? ([...protectedRoutes]) : ([]))],
    }]

    // console.log("Auth Value", getCurrAuth());
    // console.log("Final Routes", finalRoutes);

    return createBrowserRouter(finalRoutes);
}

export default useMyRouter;