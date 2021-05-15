import styled from 'styled-components';
import Company from './Company';
import Pagination from './Pagination';
import {useSelector, useDispatch } from 'react-redux'
import { getAllCompanies } from '../store/company/companySlice'
import { useEffect } from 'react';
//query server

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Companies() {
    const data = useSelector(({company}) => company.companies)
    console.log("data", data)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCompanies())
    }, []);
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <Pagination page={1} />
            <ProductListStyles>
                {data.map(company => (
                    <Company key={company.id} company={company}/>
                ))}
            </ProductListStyles>
            <Pagination page={1} />
        </div>
    )
}