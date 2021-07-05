import { useSelector } from "react-redux"
import OrderStyles from "./styles/OrderStyles"
import Order from './Order'

export default function Orders() {
    const {orders: data} = useSelector(({user}) => user);
    let orders = "No orders found";

    if (data.length) {
        orders = data.map((item) => {
            return <Order item={item} key={item.id}/>
        })
    }

    return (
        <OrderStyles>
            {orders}
        </OrderStyles>
    )
}
