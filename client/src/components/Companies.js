import styled from 'styled-components';
import Company from './Company';
import {useSelector } from 'react-redux'

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Companies() {
    const data = useSelector(({company}) => company.companies)
    const {user} = useSelector(({user}) => user);

    return (
        <ProductListStyles>
            {data?.rows && data.rows.map(company => (
                <Company key={company.id} company={company}/>
            ))}
        </ProductListStyles>
    )
}