import React, { ReactNode, createContext, useReducer, useState } from "react";

interface orderContextCompType {
    children: ReactNode
}

// interface orderContextType {
//     items: object,
//     setItems: React.Dispatch<React.SetStateAction<paketType[]>>
// }

// interface itemType {
//     nama: string,
//     kategori: string,
//     jumlah: number,
//     harga: number
// }
const reducer = (state, action) => {
    const { nama } = action.payload || { nama: null }
    const itemIn = state?.find(item => {
        return item.nama == nama
    }) || null
    switch (action.type) {
        case 'TAMBAH_PESANAN':
            if (itemIn) {
                itemIn.jumlah++;
                console.log(`tambah jumlah item menjadi ${itemIn.jumlah}`)
                return state
            } else {
                state.push(action.payload);
                console.log('tambah item')
                return state
            }
        case 'KURANGI_PESANAN':
            if (itemIn.jumlah > 1) {
                itemIn.jumlah--;
                console.log(`kurangi jumlah item menjadi ${itemIn.jumlah}`)
                return state
            } else {
                const itemIndex = state.indexOf(itemIn)
                state.splice(itemIndex, 1);
                console.log(`kurangi item`)
                return state
            }
        case 'HAPUS_PESANAN': {
            const itemIndex = state.indexOf(itemIn)
            itemIn.jumlah = 1
            state.splice(itemIndex, 1);
            console.log(`hapus item`)
            return state
        } case 'HAPUS_SEMUA_PESANAN': {
            state.splice(0, state.length);
            console.log(`hapus semua item`)
            return state
        }
        default:
            return state
    }
}
export const OrderContext = createContext({})
const OrderContextComp: React.FC<orderContextCompType> = ({ children }) => {
    const [items, setItems] = useState([])
    const [state, dispatch] = useReducer(reducer, items)
    return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>
}

export default OrderContextComp