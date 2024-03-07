import React, { useContext, useState } from 'react'
import Card from '../components/molekul/card'
import Navbar from '../components/organism/navbar'
import { makan, minum, paket, paketType } from '../assets/constant'
import { Menu } from '../context/menuContext'
import Button from '../components/atom/button'
import { OrderContext } from '../context/orderContext'
import ListItem from '../components/molekul/lisItem'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Dashboard: React.FC = () => {
    const window = useContext(Menu)
    const item = useContext(OrderContext)
    //handle loading
    const [loading, setLoading] = useState(false)
    //handle total harga pesanan
    const totalHarga =
        item.state?.reduce((accumulator: number, currentValue: paketType) => {
            return (
                accumulator + currentValue.harga * currentValue.jumlah
            );
        }, 0)
    //handle tambah pesanan
    const handleTambahPesanan = async (e) => {
        e.preventDefault()
        //hanya bisa dijalankan ketika state tidak kosong
        if (item.state.length != 0) {
            try {
                setLoading(true)
                const response = await axios.post('http://localhost:5500/order/v1/addOrder', { data: item.state }, { withCredentials: true })
                item.dispatch({ type: "HAPUS_SEMUA_PESANAN" })
                toast.success(response.data.message, { position: 'bottom-center', draggable: true })
                return response
            } catch (error) {
                setLoading(true)
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            return null;
        }
    }
    return (
        <div className='bg-gray-200 w-full min-h-screen p-3 relative'>
            <Navbar />
            {
                window?.val == 'menu' ? <><div className='w-full flex gap-x-3 my-3'>
                    <div onClick={() => { window.setKategori({ status: 'paket' }) }} className={`${window.kat.status == 'paket' ? 'bg-blue-500 text-white' : 'bg-white'} font-semibold h-[40px] flex items-center justify-center rounded-lg px-4`}>
                        Paket
                    </div>
                    <div onClick={() => { window.setKategori({ status: 'makan' }) }} className={`${window.kat.status == 'makan' ? 'bg-blue-500 text-white' : 'bg-white'} font-semibold h-[40px] flex items-center justify-center rounded-lg px-4`}>
                        Makan
                    </div>
                    <div onClick={() => { window.setKategori({ status: 'minum' }) }} className={`${window.kat.status == 'minum' ? 'bg-blue-500 text-white' : 'bg-white'} font-semibold h-[40px] flex items-center justify-center rounded-lg px-4`}>
                        Minum
                    </div>
                </div>
                    <div className='flex gap-2 flex-wrap'>
                        {
                            window.kat.status == 'paket' && paket.map((item) => {
                                return <Card key={item.nama} nama={item.nama} kategori={item.kategori} harga={item.harga} />
                            })
                        }
                        {
                            window.kat.status == 'makan' && makan.map((item) => {
                                return <Card key={item.nama} nama={item.nama} kategori={item.kategori} harga={item.harga} />
                            })
                        }
                        {
                            window.kat.status == 'minum' && minum.map((item) => {
                                return <Card key={item.nama} nama={item.nama} kategori={item.kategori} harga={item.harga} />
                            })
                        }
                    </div>
                </> : <div className='w-full min-h-fit flex flex-col gap-y-4 mt-2'>
                    <h1 className='text-2xl font-bold'>Total Pesanan</h1>
                    <div className='w-full rounded-lg bg-white p-3'>
                        <ul className='flex flex-col gap-y-5 w-full h-fit p-0'>
                            {
                                item?.state?.map(item => {
                                    return <ListItem key={item.name} item={item} />
                                })
                            }
                        </ul>
                        <hr />
                        <div className='flex justify-between w-full text-2xl font-bold'>
                            <span>Total</span>
                            <span>{`Rp. ${new Intl.NumberFormat("en-US").format(totalHarga)}`}</span>
                        </div>
                    </div>
                    <Button type='button' className={`${loading ? "bg-gray-500" : "bg-teal-800"} ${item.state.length == 0 ? "disabled" : ""} w-full h-[50px] text-white text-xl `} onClick={handleTambahPesanan}>Buat Pesanan</Button>
                    <ToastContainer />
                </div>
            }
        </div>
    )
}

export default Dashboard