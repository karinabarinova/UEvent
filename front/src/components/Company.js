import {Link} from 'react-router-dom';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import { useHistory } from "react-router-dom";
import DeleteCompany from './DeleteCompany';

export default function Company({company}) {
    const history = useHistory();

    return (
        <ItemStyles>
            <img src={company?.image ? company.image : '/defaultEventPage.jfif'} alt={company.name}/>
            <Title>
                <Link to={'/company/' + company.id}>{company.name}</Link>
            </Title>
            <p>{company.description}</p>
            <div className="buttonList">
                <Link to={{
                    pathname: "/update-company/" + company.id,
                }}>Edit</Link>
                <DeleteCompany id={company.id}>Delete</DeleteCompany>
            </div>
        </ItemStyles>
    )
}