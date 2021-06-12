import {useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import PaginationStyles from './styles/PaginationStyles';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PaginationProducts({ page }) {
    const { t } = useTranslation('common');
    const products = useSelector(({product}) => product.products)
    const count = products.count;
    const pageCount = Math.ceil(count / 4);
    const showPage = page > pageCount || page <= 0 ? 1 : page;

    return (
        <PaginationStyles>
            <Link to={`/${showPage - 1 >= 1 ? showPage - 1 : 1 }`}>
                <a aria-disabled={showPage <= 1}>← {t('PREV')}</a>
            </Link>
            <p>{t('PAGE')} {showPage} {t('OF')} {pageCount}</p>
            <p>{count} {t('ITEMS_TOTAL')}</p>
            <Link to={`/${showPage + 1 <= pageCount ? showPage + 1 : pageCount}`}>
                <a aria-disabled={showPage >= pageCount}>{t('NEXT')} →</a>
            </Link>
        </PaginationStyles>
    );
}