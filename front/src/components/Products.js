import styled from 'styled-components';
import Product from './Product';
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../store/products/productSlice'
import { useEffect, useState } from 'react';
//query server

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Products() {
    const data = useSelector(({product}) => product)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, []);
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <ProductListStyles>
                {data.products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </ProductListStyles>
        </div>
    )
}