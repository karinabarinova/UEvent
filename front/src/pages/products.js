import {useDispatch } from 'react-redux'
import PaginationProducts from '../components/PaginationProducts';
import Products from '../components/Products';
import { getAllProducts } from '../store/products/productSlice'
import { useEffect } from 'react';

export default function ProductsPage(props) {
    const dispatch = useDispatch();
    const page = parseInt(props.match.params.page);

    useEffect(() => {
        dispatch(getAllProducts(page || 1))
    }, [page]);

    return(
        <div>
            <PaginationProducts page={page || 1} />
            <Products page={page || 1}/>
            <PaginationProducts page={page || 1} />
        </div>
    )
}
