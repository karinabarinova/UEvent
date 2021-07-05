import { useSelector } from "react-redux"
import OrderStyles from "./styles/OrderStyles"

export default function Order() {
    const {selectedOrder: item} = useSelector(({user}) => user);
    if (!item?.items) return <h2>Order not found</h2>
    const items = JSON.parse(item.items)
    return (
        <OrderStyles>
            <p>
                <span>Order Id: </span>
                <span>{item.id}</span>
            </p>
            <p>
                <span>Charge: </span>
                <span>{item.charge}</span>
            </p>
            <p>
                <span>Order Total: </span>
                <span>{item.total / 100}$</span>
            </p>
            <p>
                <span>ItemCount: </span>
                <span>{items.length}</span>
            </p>
            <div className="items">
                {items.map((order) => (
                    <div className="order-item" key={order.id}>
                        <img src={'/defaultEventPage.jfif'} alt={order.name} />
                        <div className="item-details">
                            <h2>{order.name}</h2>
                            <p>Qty: {order.quantity}</p>
                            <p>Each: {order.price}$</p>
                            <p>Sub Total: {order.price * order.quantity}$</p>
                        </div>
                    </div>
              ))}
            </div>
        </OrderStyles>
    )
}
