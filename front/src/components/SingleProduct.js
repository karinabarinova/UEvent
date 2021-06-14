import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getProductById } from '../store/products/productSlice';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import EventIcon from '@material-ui/icons/Event';
import Map from './MapComponent'
import OtherEvents from './OtherEvents'

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

    const { event } = data.product;
    let product = <h2>Oops... Event not found</h2>;

    if (event) {
        let arr = new Date(event.startDate).toString().split(' ')
        const remove = [6, 7, 8, 9];

        for (let i = remove.length - 1; i >= 0; i--)
            arr.splice(remove[i], 1);

        let time = arr[4].split(':');
        time.splice(2, 1);
        arr[4] = time.join(':');
        arr[5] = arr[5].replace(new RegExp("0", "g"), '')
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
                        <EventIcon style={{fontSize: 20}}/> {arr.join(' ')}
                    </FloatContainer>
                </div>
            </ProductStyles>
        )
    }
    return (
        <>
            {product}
            <Map />
            <OtherEvents otherEvents={data.product.otherEvents}/>
        </>
    )
}