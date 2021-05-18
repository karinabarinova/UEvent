import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import DeleteCompany from './DeleteCompany';

export default function Company({company}) {
    const authUser = useSelector(({auth}) => auth.user)

    return (
        <ItemStyles>
            <img src={company?.image ? company.image : '/defaultEventPage.jfif'} alt={company.name}/>
            <Title>
                <Link to={'/company/' + company.id}>{company.name}</Link>
            </Title>
            <p>{company.description}</p>
            {Object.keys(authUser).length !== 0  && (
                <div className="buttonList">
                    <Link to={{
                        pathname: "/update-company/" + company.id,
                    }}>Edit</Link>
                    <DeleteCompany id={company.id}>Delete</DeleteCompany>
                </div>
            )}
        </ItemStyles>
    )
}