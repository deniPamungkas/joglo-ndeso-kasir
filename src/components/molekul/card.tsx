import React, { useContext } from 'react'
import { OrderContext } from '../../context/orderContext'
import Button from '../atom/button'
import { Menu } from '../../context/menuContext'
import { makan, minum, paket } from '../../assets/constant'

interface cardProps {
    nama: string,
    kategori: string,
    harga: number,
}
const Card: React.FC<cardProps> = ({ nama, harga }) => {
    const user = JSON.parse(window.sessionStorage.getItem('userData')) || null
    const item = useContext(OrderContext)
    const menu = useContext(Menu)
    const handleOrder = (e) => {
        e.preventDefault();
        const element = e.target.parentElement.id;
        //filter item yang ditambahkan
        const asd = () => {
            if (menu?.kat.status == 'paket') return paket
            if (menu?.kat.status == 'minum') return minum
            if (menu?.kat.status == 'makan') return makan
        }
        const itemName = asd()?.filter(item => {
            return item.nama == element
        })[0]

        item.dispatch({ type: 'TAMBAH_PESANAN', payload: { ...itemName, user_id: user._id } })
    }
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body" id={nama}>
                <h5 className="card-title">{nama}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>{harga}</p>
                <Button type='button' onClick={handleOrder} className="btn btn-primary">Tambah Pesanan</Button>
            </div>
        </div>
    )
}

export default Card