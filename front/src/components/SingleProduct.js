import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getProductById } from '../store/products/productSlice';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import EventIcon from '@material-ui/icons/Event';

const ProductStyles = styled.div`
    display: grid;  
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`

const ImageContainer = styled.div`
    position: relative;
`

export default function SingleProduct(props) {
    const data = useSelector(({product}) => product)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductById(props.match.params.id))
    }, []);
    // if (loading) return <p>Loading...</p>
    // if (error) return <DisplayError error={error} />
    const { event } = data.product;
    let product = <h2>Oops... Event not found</h2>;

    if (event) {
        product = (
            <ProductStyles>
                <title>Uevent | {event.name}</title>
                <ImageContainer>
                    <img src={event?.image ? event.image : '/defaultEventPage.jfif'} alt={event.name} />
                    <PriceTag>{event.price}$</PriceTag>

                </ImageContainer>
                <div className="details">
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <Tags><b>{event.theme} / {event.format}</b></Tags>
                    <EventIcon /> {new Date(event.startDate).toString()}
                </div>
            </ProductStyles>
        )
    }
    return (
        <>
            {product}
        </>
    )
}