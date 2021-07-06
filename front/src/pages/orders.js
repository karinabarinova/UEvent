import {useDispatch } from 'react-redux'
import Orders from '../components/Orders';
import { getOrders } from '../store/user/userSlice'
import { useEffect } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';

export default function OrdersPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    return(
        <PleaseSignIn>
            <Orders />
        </PleaseSignIn>
    )
}
