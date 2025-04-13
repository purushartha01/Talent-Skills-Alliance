import Navbar from '@/components/custom/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const PageLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PageLayout