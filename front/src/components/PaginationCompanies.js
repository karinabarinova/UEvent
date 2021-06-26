import {useSelector } from 'react-redux'
import PaginationStyles from './styles/PaginationStyles';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PaginationCompanies({ page }) {
    const { t } = useTranslation('common');
    const companies = useSelector(({company}) => company.companies)
    const count = companies.count;
    const pageCount = Math.ceil(count / 4);
    const showPage = page > pageCount || page <= 0 ? 1 : page;
    return (
        <PaginationStyles>
            <Link to={`/companies/${showPage - 1 >= 1 ? showPage - 1 : 1 }`}>
                <a href={`/companies/${showPage - 1 >= 1 ? showPage - 1 : 1 }`} aria-disabled={showPage <= 1}>← {t('PREV')}</a>
            </Link>
            <p>{t('PAGE')} {showPage} {t('OF')} {pageCount}</p>
            <p>{count} {t('ITEMS_TOTAL')}</p>
            <Link to={`/companies/${showPage + 1 <= pageCount ? showPage + 1 : pageCount}`}>
                <a href={`/companies/${showPage + 1 <= pageCount ? showPage + 1 : pageCount}`} aria-disabled={showPage >= pageCount}>{t('NEXT')} →</a>
            </Link>
        </PaginationStyles>
    );
}