import { createBrowserRouter } from 'react-router-dom'
import Home from './../pages/Home';
import PageLayout from './../components/PageLayout';


const useMyRouter = () => {
    const routes = [
        {
            path: '/',
            element: <Home />
        },
    ];

    const finalRoutes = [{
        element: <PageLayout />,
        children: routes
    }]

    return createBrowserRouter(finalRoutes);
}

export default useMyRouter;