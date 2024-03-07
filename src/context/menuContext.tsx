import React, { ReactNode, createContext, useState } from 'react'

interface menuContextType {
    val: string,
    kat: object,
    setMenu: () => void,
    setPesanan: () => void
    setKategori: React.Dispatch<React.SetStateAction<{
        status: string;
    }>>
}
interface menuContextProps {
    children: ReactNode
}
export const Menu = createContext<menuContextType | undefined>(undefined)

const MenuContextComp: React.FC<menuContextProps> = ({ children }) => {
    //handle state menu pada dashboard
    const [wind, setWind] = useState('menu')
    const [kategori, setKategori] = useState({ status: 'paket' })
    const setMenu = () => {
        setWind('menu')
    }
    const setPesanan = () => {
        setWind('pesanan')
    }
    const menuContextValue: menuContextType = {
        val: wind,
        kat: kategori,
        setMenu,
        setPesanan,
        setKategori
    }

    return (
        <Menu.Provider value={menuContextValue}>
            {children}
        </Menu.Provider>
    )
}

export default MenuContextComp