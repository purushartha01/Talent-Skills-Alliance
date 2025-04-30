import { createBrowserRouter } from 'react-router-dom'
import Home from './../pages/Home';
import PageLayout from '@/components/custom/PageLayout';
import Signup from '@/components/custom/Signup';
import Proposals from '@/pages/Proposals';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import NotFound from '@/pages/NotFound';
import UserProfile from '@/pages/UserProfile';
import Settings from '@/pages/Settings';
import ManageProposals from '@/pages/ManageProposals';
import ViewUserProfile from '@/pages/ViewUserProfile';
import ViewProposal from '@/pages/ViewProposal';
import UserProjects from '@/pages/UserProjects';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/components/custom/Login';
// import LoginPage from '@/pages/LoginPage';


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
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        }
    ];

    const protectedRoutes = [
        {
            path: '/proposals',
            children: [
                {
                    path: '/proposals',
                    element: <Proposals />
                },
                {
                    path: '/proposals/manage',
                    element: <ManageProposals />,
                },
                {

                    path: '/proposals/:id',
                    element: <ViewProposal />,
                }
            ],
        },
        {
            path: '/user',
            children: [
                {
                    path: '/user/profile',
                    element: <UserProfile />,
                }, {
                    path: '/user/settings',
                    element: <Settings />,
                },
                {
                    path: '/user/projects',
                    element: <UserProjects />
                },
                {
                    path: '/user/:id',
                    element: <ViewUserProfile />
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