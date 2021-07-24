import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getProductById, updateEventImage } from '../store/products/productSlice';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import EventIcon from '@material-ui/icons/Event';
import Map from './MapComponent'
import SimilarEvents from './SimilarEvents'
import Comments from './Comments';
import NewComment from './NewComment'
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Form from './styles/Form';

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
    const [image, setImage] = useState('');
    const {user} = useSelector(({user}) => user);

    useEffect(() => {
        dispatch(getProductById(props.match.params.id))
    }, []);

    const { event, comments, similarEvents } = data.product;
    let product = <h2>Oops... Event not found</h2>;

    function handleImageChange(e) {
        e.preventDefault();
        setImage(e.target.files[0]);
    }

    function checkOwner() {
        for(let i = 0; i < user.companies.length; i++) {
            if (user.companies[i].id === event.organizer) {
                return true;
            }
        }
        return false;
    }

    if (event) {
        let isOwner = false;
        if (user?.companies) {
            isOwner = checkOwner();
        }
        product = (
            <>
                <ProductStyles>
                    <title>Uevent | {event.name}</title>
                    <ImageContainer>
                        {/* <img src={event?.image ? event.image : '/defaultEventPage.jfif'} alt={event.name} /> */}
                        <img src={event?.image ? "http://localhost:3006/" + event.image.replace('resources', '') : '/defaultEventPage.jfif'} alt={event.name} />
                        <PriceTag>{event.price}$</PriceTag>

                    </ImageContainer>
                    <div className="details">
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <Tags><b>{event.theme} / {event.format}</b></Tags>
                        {isOwner && (
                        <Form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append("image", image);
                            dispatch(updateEventImage(formData, event.id))
                        }}>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                            />
                            <Button 
                                variant="contained" 
                                type="submit" 
                                style={{
                                    background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
                                }}
                            > Upload 🖼️
                            </Button>
                        </Form>
                        )}
                        <FloatContainer>
                            <EventIcon style={{fontSize: 20}}/> {moment(event.startDate).format('MMMM Do YYYY, h:mm a')}
                        </FloatContainer>
                    </div>
                </ProductStyles>
                <div style={{ position: 'relative', width: '85vw', height: '95vh' }}>
                    <Map location={event.location.coordinates}/>
                </div>
                <NewComment id={props.match.params.id}/>
                <Comments comments={comments}/>
                <SimilarEvents similarEvents={similarEvents}/>
            </>
        )
    }
    return (
        <>
            {product}
        </>
    )
}