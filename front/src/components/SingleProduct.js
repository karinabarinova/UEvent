import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getProductById } from '../store/products/productSlice';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import EventIcon from '@material-ui/icons/Event';
import Map from './MapComponent'
import SimilarEvents from './SimilarEvents'
import Comments from './Comments';
import NewComment from './NewComment'
import moment from 'moment';

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

const FloatContainer = styled.div`
    float: left;
    margin-top: 2rem;
    font-size: 16px;
    width: 60%;
`

export default function SingleProduct(props) {
    const data = useSelector(({product}) => product)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductById(props.match.params.id))
    }, []);

    const { event, comments, similarEvents } = data.product;
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
                    <FloatContainer>
                        <EventIcon style={{fontSize: 20}}/> {moment(event.startDate).format('MMMM Do YYYY, h:mm a')}
                    </FloatContainer>
                </div>
            </ProductStyles>
        )
    }
    return (
        <>
            {product}
            <div style={{ position: 'relative', width: '100vw', height: '95vh' }}>
                <Map />
            </div>
            <NewComment id={props.match.params.id}/>
            <Comments comments={comments}/>
            <SimilarEvents similarEvents={similarEvents}/>
        </>
    )
}