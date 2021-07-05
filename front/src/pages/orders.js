import {useDispatch } from 'react-redux'
import Orders from '../components/Orders';
import { getOrders } from '../store/user/userSlice'
import { useEffect } from 'react';

export default function OrdersPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    return(
        <div>
            <Orders />
        </div>
    )
}
