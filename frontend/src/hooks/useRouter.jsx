import { createBrowserRouter } from 'react-router-dom'
import Home from './../pages/Home';
import PageLayout from '@/components/custom/PageLayout';
import Login from '@/components/custom/Login';


const useMyRouter = () => {
    const routes = [
        {
            path: '/',
            element: <Home />
        },{
            path: '/login',
            element: <Login />
        },
    ];

    const finalRoutes = [{
        element: <PageLayout />,
        children: routes
    }]

    return createBrowserRouter(finalRoutes);
}

export default useMyRouter;