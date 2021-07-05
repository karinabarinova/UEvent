export default function Order({ item }) {
    const items = JSON.parse(item.items)
    return (
        <div>
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
        </div>
    )
}
