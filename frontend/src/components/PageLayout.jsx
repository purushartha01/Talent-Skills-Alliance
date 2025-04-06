import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default PageLayout