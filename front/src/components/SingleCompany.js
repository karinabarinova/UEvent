import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getCompanyById } from '../store/company/companySlice';

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

// createdAt: "2021-04-27T15:39:43.748Z"
// description: "You know us"
// id: 1
// location: null
// name: "Trello"
// owner: 1
// updatedAt: "2021-04-27T15:39:43.748Z"

export default function SingleCompany(props) {
    const data = useSelector(({company}) => company.company)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyById(props.match.params.id))
    }, [false]);
    console.log("company",data)
    let company = <h2>Oops... Company not found</h2>;

    if (data.id) {
        company = (
            <ProductStyles>
                <title>Uevent | {data.name}</title>
                <ImageContainer>
                    <img src={data?.image ? data.image : '/defaultEventPage.jfif'} alt={data.name} />
                </ImageContainer>
                <div className="details">
                    <h2>{data.name}</h2>
                    <p>{data.description || "Some description"}</p>
                </div>
                
            </ProductStyles>
        )
    }
    return (
        <>
            {company}
        </>
    )
}