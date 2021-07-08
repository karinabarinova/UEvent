import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import DeleteCompany from './DeleteCompany';

export default function Company({account, company}) {
    const authUser = useSelector(({auth}) => auth.user)
    console.log("authUser", authUser)
    console.log('company', company)

    let isOwner = false;
    if (!account && Object.keys(authUser).length !== 0 && authUser?.id === company.owner) {
        isOwner = true;
    }

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