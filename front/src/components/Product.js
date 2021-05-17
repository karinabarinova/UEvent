import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import DeleteEvent from './DeleteEvent'

export default function Product({product}) {
    const authUser = useSelector(({auth}) => auth.user)

    return (
        <ItemStyles>
            <img src={product?.image ? product.image : '/defaultEventPage.jfif'} alt={product.name}/>
            <Title>
                <Link to={'/event/' + product.id}>{product.name}</Link>
            </Title>
            <PriceTag>{product.price}$</PriceTag>
            <p>{product.description}</p>
            <Tags><b>{product.theme} / {product.format}</b></Tags>
            {/* TODO: add check if owner of event is the authUser.id */}
            {Object.keys(authUser).length !== 0  && (
                <div className="buttonList"> 
                    <Link to={{
                        pathname: "/update-event/" + product.id,
                    }}>Edit</Link>
                    <DeleteEvent id={product.id}>Delete</DeleteEvent>
                </div>
            )}
        </ItemStyles>
    )
}