import {Link} from 'react-router-dom';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import { useHistory } from "react-router-dom";

// import DeleteProduct from './DeleteProduct'

export default function Company({company}) {
    const history = useHistory();

    return (
        <ItemStyles onClick={() => history.push('/company/' + company.id)}>
            <img src={company?.image ? company.image : '/defaultEventPage.jfif'} alt={company.name}/>
            <Title>
                <Link to={'/company/' + company.id}>{company.name}</Link>
            </Title>
            <p>{company.description}</p>
            <div className="buttonList">
                <Link>Edit</Link>
                {/* <DeleteCompany id={company.id}>Delete</DeleteCompany> */}
            </div>
        </ItemStyles>
    )
}