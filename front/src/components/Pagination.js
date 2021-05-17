import {useSelector, useDispatch } from 'react-redux'
import PaginationStyles from './styles/PaginationStyles';
import {Link} from 'react-router-dom';

export default function Pagination({ page }) {
    const data = useSelector(({product}) => product)
    const count = data.products.length;
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