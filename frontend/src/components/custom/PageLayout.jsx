import Navbar from '@/components/custom/Navbar';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default PageLayout