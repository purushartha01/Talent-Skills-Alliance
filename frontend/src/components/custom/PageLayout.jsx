import Navbar from '@/components/custom/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import AuthNavbar from './AuthNavbar';

const PageLayout = () => {

    const { getCurrAuth } = useContext(AuthContext);


    return (
        <div className='flex flex-col min-h-screen'>
            {Object.keys(getCurrAuth()).length === 0 ? < Navbar /> : <AuthNavbar />}
            <div className='flex flex-grow'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default PageLayout