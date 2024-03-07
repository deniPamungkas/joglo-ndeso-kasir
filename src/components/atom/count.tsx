import { useContext, useState } from "react"
import { OrderContext } from "../../context/orderContext"

interface countProps {
    item: object,
    // setCount: React.Dispatch<React.SetStateAction<number>>,
    // count: number
}

const Count: React.FC<countProps> = (props) => {
    const item = useContext(OrderContext)
    const [count, setCount] = useState(props.item.jumlah)
    const handleCount = (e) => {
        e.preventDefault()
        if (e.target.name == 'plus') {
            console.log('render count')
            console.log(props.item)
            setCount((cur) => cur + 1)
            item.dispatch({ type: 'TAMBAH_PESANAN', payload: props.item })
        } else {
            if (count > 1) {
                setCount((cur) => cur - 1)
            } else {
                item.dispatch({ type: 'HAPUS_PESANAN', payload: props.item })
            }
        }
    }
    return (
        <div className="flex w-20 sm:w-24 h-8 sm:h-12 rounded-lg bg-gray-200 justify-between items-center">
            <button name="minus" className="h-full flex-1 font-bold" onClick={handleCount}>-</button>
            <span className="flex-1 text-center h-full flex items-center justify-center">{count}</span>
            <button name="plus" className="h-full flex-1 font-bold" onClick={handleCount}>+</button>
        </div>
    )
}

export default Count