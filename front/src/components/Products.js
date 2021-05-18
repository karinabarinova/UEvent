import styled from 'styled-components';
import Product from './Product';
import {useSelector, useDispatch } from 'react-redux'

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Products(props) {
    const data = useSelector(({product}) => product.products)

    return (
        <ProductListStyles>
            {data?.rows && data.rows.map(product => {
                return <Product key={product.id} product={product}/>
            })}
        </ProductListStyles>
    )
}