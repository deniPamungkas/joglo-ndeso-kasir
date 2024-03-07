import React, { useContext, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { OrderContext } from "../../context/orderContext";
import { Menu } from "../../context/menuContext";

interface listItemProps {
    // nama: string,
    // jumlah: number,
    // harga: number,
    key: string
    item: object
}

const ListItem: React.FC<listItemProps> = (props) => {
    const item = useContext(OrderContext)
    const menu = useContext(Menu)
    const [count, setCount] = useState(props.item.jumlah)

    const handleCount = (e) => {
        menu?.setKategori({ status: menu?.kat.status })
        e.preventDefault()
        if (e.target.name == 'plus') {
            setCount((cur) => cur + 1)
            item.dispatch({ type: 'TAMBAH_PESANAN', payload: props.item })
        } else {
            if (count > 1) {
                setCount((cur) => cur - 1)
                item.dispatch({ type: 'KURANGI_PESANAN', payload: props.item })
            } else {
                setCount(0)
                item.dispatch({ type: 'HAPUS_PESANAN', payload: props.item });
            }
        }
    }

    const handleDelete = () => {
        menu?.setKategori({ status: menu?.kat.status })
        item.dispatch({ type: 'HAPUS_PESANAN', payload: props.item })
    }
    return (
        <li key={props.key} className='flex justify-between text-xl font-semibold h-16 sm:h-20 items-center '>
            <div className='flex flex-col gap-y-2'>
                <span>{props.item.nama}</span>
                <div className='flex gap-x-2'>
                    <div className="flex w-20 sm:w-24 h-8 sm:h-12 rounded-lg bg-gray-200 justify-between items-center">
                        <button name="minus" className="h-full flex-1 font-bold" onClick={handleCount}>-</button>
                        <span className="flex-1 text-center h-full flex items-center justify-center">{props.item.jumlah}</span>
                        <button name="plus" className="h-full flex-1 font-bold" onClick={handleCount}>+</button>
                    </div>
                    <div className='bg-gray-200 h-8 sm:h-12 w-8 sm:w-12 flex justify-center items-center rounded-lg' onClick={handleDelete}><DeleteOutlineIcon /></div></div>
            </div>
            <span>{`Rp. ${new Intl.NumberFormat("en-US").format(props.item.harga * props.item.jumlah)}`}</span>
        </li>
    )
}

export default ListItem