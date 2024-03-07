import React, { useContext } from 'react'
import Button from '../atom/button'
import { Menu } from '../../context/menuContext'

const Navbar = () => {
    const window = useContext(Menu)
    return (
        <nav className='w-full h-[50px] flex items-center justify-between'>
            <span className='font-bold text-2xl'>JOGLO NDESO</span>
            <div className='flex gap-x-2 text-white text-xs'>
                <Button type='button' onClick={() => { window?.setMenu() }} className='bg-blue-500'>Menu</Button>
                <Button type='button' onClick={() => { window?.setPesanan() }} className='bg-blue-500'>Pesanan</Button>
            </div>
        </nav>
    )
}

export default Navbar