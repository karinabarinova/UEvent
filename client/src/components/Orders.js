import { useDispatch, useSelector } from "react-redux"
import {Link} from 'react-router-dom';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import styled from 'styled-components';
import { setSelectedOrder } from "../store/user/userSlice";

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(items) {
    return items.reduce((tally, item) => tally + item.quantity, 0);
  }

export default function Orders() {
    const dispatch = useDispatch();
    const {orders: data} = useSelector(({user}) => user);
    if (!data.length) return <p>No orders found</p>;

    console.log('order', data)
    return (
        <div>
            <h2>You have {data.length} orders!</h2>
            <OrderUl>
                {data.map((order) => {
                const items = JSON.parse(order.items)
                return (
                    <OrderItemStyles>
                    <Link to={`/order/${order.id}`} onClick={() => dispatch(setSelectedOrder(order))}>
                      <a>
                        <div className="order-meta">
                          <p>{countItemsInAnOrder(items)} Items</p>
                          <p>
                            {items.length} Product
                            {items.length === 1 ? '' : 's'}
                          </p>
                          <p>{order.total / 100}$</p>
                        </div>
                        <div className="images">
                          {items.map((item) => (
                            <img
                              key={`image-${item.id}`}
                              src={item?.image ? "http://localhost:3006/" + item.image.replace('resources', '') : '/defaultEventPage.jfif'}
                              alt={item.name}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                </OrderItemStyles>
                )})}
            </OrderUl>
        </div>
    );
}
