import { createBrowserRouter } from 'react-router-dom'
import Home from './../pages/Home';
import PageLayout from '@/components/custom/PageLayout';
import Login from '@/components/custom/Login';
import Signup from '@/components/custom/Signup';


const useMyRouter = () => {
    const routes = [
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
            
        }
    ];

    const finalRoutes = [{
        element: <PageLayout />,
        children: routes
    }]

    return createBrowserRouter(finalRoutes);
}

export default useMyRouter;