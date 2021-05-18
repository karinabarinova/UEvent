import {useSelector, useDispatch } from 'react-redux'
import PaginationStyles from './styles/PaginationStyles';
import {Link} from 'react-router-dom';

export default function PaginationCompanies({ page }) {
    const companies = useSelector(({company}) => company.companies)
    const count = companies.count;
    const pageCount = Math.ceil(count / 4);
    const showPage = page > pageCount || page <= 0 ? 1 : page;
    return (
        <PaginationStyles>
            <Link to={`/companies/${showPage - 1 >= 1 ? showPage - 1 : 1 }`}>
                <a aria-disabled={showPage <= 1}>← Prev</a>
            </Link>
            <p>Page {showPage} of {pageCount}</p>
            <p>{count} Items Total</p>
            <Link to={`/companies/${showPage + 1 <= pageCount ? showPage + 1 : pageCount}`}>
                <a aria-disabled={showPage >= pageCount}>Next →</a>
            </Link>
        </PaginationStyles>
    );
}