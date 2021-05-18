import styled from 'styled-components';
import Company from './Company';
import PaginationCompanies from './PaginationCompanies';
import {useSelector, useDispatch } from 'react-redux'
import { getAllCompanies } from '../store/company/companySlice'
import { useEffect } from 'react';

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Companies() {
    const data = useSelector(({company}) => company.companies)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCompanies())
    }, []);

    return (
        <div>
            <PaginationCompanies page={1} />
            <ProductListStyles>
                {data.map(company => (
                    <Company key={company.id} company={company}/>
                ))}
            </ProductListStyles>
            <PaginationCompanies page={1} />
        </div>
    )
}