import styled from 'styled-components';
import Product from './Product';

//query server

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Products() {
    // const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY)
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error: {error.message}</p>
    // console.log(data, error, loading);
    const product = [{id: 1}]
    return (
        <div>
            <ProductListStyles>
                {product.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </ProductListStyles>
        </div>
    )
}