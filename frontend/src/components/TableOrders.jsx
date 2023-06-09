import { useEffect, useState } from 'react'
import { getBill } from '../requests'

export default function TableOrders() {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        let r = await getBill()
        if (r['status']) {
            setOrders(r['data'])
        }
    }


    useEffect(() => {
        fetchOrders()
        console.log(orders)
    }, [])

    return (
        <>

        </>
    )
}