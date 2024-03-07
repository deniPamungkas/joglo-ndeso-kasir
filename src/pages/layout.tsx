import { Outlet } from 'react-router'
import Navbar from '../components/organism/navbar'

const Layout = () => {
    return (
        <div className='flex'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout