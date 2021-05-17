import {useSelector, useDispatch } from 'react-redux'
import PaginationStyles from './styles/PaginationStyles';
import {Link} from 'react-router-dom';

export default function PaginationCompanies({ page }) {
    const companies = useSelector(({company}) => company.companies)
    const count = companies.length;
    const pageCount = Math.ceil(count / 1);
    return (
        <PaginationStyles>
            <Link to={`/${page - 1}`}>
                <a aria-disabled={page <= 1}>← Prev</a>
            </Link>
            <p>Page {page} of {pageCount}</p>
            <p>{count} Items Total</p>
            <Link to={`/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>Next →</a>
            </Link>
        </PaginationStyles>
    );
}