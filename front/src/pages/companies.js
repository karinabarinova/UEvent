import {useDispatch } from 'react-redux'
import PaginationCompanies from '../components/PaginationCompanies';
import Companies from '../components/Companies';
import { useEffect } from 'react';
import { getAllCompanies } from '../store/company/companySlice';

export default function CompaniesPage(props) {
    const dispatch = useDispatch();
    const page = parseInt(props.match.params.page);

    useEffect(() => {
        dispatch(getAllCompanies(page || 1))
    }, [page]);

    return(
        <div>
            <PaginationCompanies page={page || 1} />
            <Companies page={page || 1}/>
            <PaginationCompanies page={page || 1} />
        </div>
    )
}
