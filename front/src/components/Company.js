import {Link} from 'react-router-dom';
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import DeleteCompany from './DeleteCompany';
import { useUser } from './User';

export default function Company({account, company}) {
    const user = useUser()

    let isOwner = false;
    if (!account && user && Object.keys(user.user).length !== 0 && user?.id === company.owner) {
        isOwner = true;
    }

    if (!company) return null;

    return (
        <ItemStyles>
            <img src={company?.image ? company.image : '/defaultCompanyPhoto.jpg'} alt={company.name}/>
            <Title>
                <Link to={'/company/' + company.id}>{company.name}</Link>
            </Title>
            <p>{company.description}</p>
            {isOwner  && (
                <div className="buttonList">
                    {!account && (
                    <>
                        <Link to={{
                            pathname: "/update-company/" + company.id,
                        }}>Edit</Link>
                        <DeleteCompany id={company.id}>Delete</DeleteCompany>
                    </>
                    )}
                </div>
            )}
        </ItemStyles>
    )
}