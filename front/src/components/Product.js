import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import DeleteEvent from './DeleteEvent'
import AddToCart from './AddToCart';
import { useCart } from '../lib/cartState';
import { useUser } from './User';

export default function Product({account, product, userCompanies}) {
    const {user} = useUser()

    function checkOwner() {
        for(let i = 0; i < userCompanies.length; i++) {
            if (userCompanies[i].id === product.organizer) {
                return true;
            }
        }
        return false;
    }

    let isOwner = false;
    if (!account && userCompanies) {
        isOwner = checkOwner();
    }
    
    const {openCart } = useCart();
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
            {Object.keys(user).length !== 0  && (
                <div className="buttonList"> 
                    {!account && isOwner && <Link to={{
                        pathname: "/update-event/" + product.id,
                    }}>Edit</Link>}
                    {!account && <AddToCart product={product} openCart={openCart}/>}
                    {!account && isOwner && <DeleteEvent id={product.id}>Delete</DeleteEvent>}
                </div>
            )}
        </ItemStyles>
    )
}