import { useEffect, useState } from 'react'
import { setAsToPay } from '../requests'

export default function TableOrders() {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        // let r = await setAsToPay()
        // if (r['status']) {
        //     setOrders(r['data'])
        // }
    }


    useEffect(() => {
        // fetchOrders()
        // console.log(orders)
    }, [])

    return (
        <>

        </>
    )
}