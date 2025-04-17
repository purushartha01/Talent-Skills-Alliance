import Navbar from '@/components/custom/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import AuthNavbar from './AuthNavbar';

const PageLayout = () => {

    const { getCurrAuth } = useContext(AuthContext);

    return (
        <div>
            {Object.keys(getCurrAuth).length === 0 ? < Navbar /> : <AuthNavbar />}
            <Outlet />
            <Footer />
        </div>
    )
}

export default PageLayout