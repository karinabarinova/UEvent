import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Form from './styles/Form';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getCompanyById, updateCompanyImage } from '../store/company/companySlice';
import Map from './MapComponent'
import { useUser } from './User';

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

export default function SingleCompany(props) {
    const data = useSelector(({company}) => company.company)
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const user = useUser()

    let isOwner = false;
    if (user && Object.keys(user.user).length !== 0 && user?.user?.id === data.owner) {
        isOwner = true;
    }

    useEffect(() => {
        dispatch(getCompanyById(props.match.params.id))
    }, [false]);

    function handleImageChange(e) {
        e.preventDefault();
        setImage(e.target.files[0]);
    }
    let company = <h2>Oops... Company not found</h2>;

    if (data.id) {
        company = (
            <>
                <ProductStyles>
                    <title>Uevent | {data.name}</title>
                    <ImageContainer>
                        <img src={data?.image ? "http://localhost:3006/" + data.image.replace('resources', '') : '/defaultCompanyPhoto.jpg'} alt={data.name} />
                    </ImageContainer>
                    <div className="details">
                        <h2>{data.name}</h2>
                        <p>{data.description || "Some description"}</p>
                        {isOwner && (
                        <Form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append("image", image);
                            dispatch(updateCompanyImage(formData, data.id))
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
                    </div>
                </ProductStyles>
                <div style={{ position: 'relative', width: '85vw', height: '95vh' }}>
                    <Map location={data.location.coordinates}/>
                </div>
            </>
        )
    }
    return (
        <>
            {company}
        </>
    )
}