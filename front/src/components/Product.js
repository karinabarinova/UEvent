import {Link} from 'react-router-dom';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
// import DeleteProduct from './DeleteProduct'

export default function Product({product}) {
    return (
        <ItemStyles>
            <img src={product?.image ? product.image : 'defaultEventPage.jfif'} alt={product.name}/>
            <Title>
                <Link href="">{product.name}</Link>
            </Title>
            <PriceTag>{product.price}$</PriceTag>
            <p>{product.description}</p>
            <Tags><b>{product.theme} / {product.format}</b></Tags>
            <div className="buttonList">
                <Link>Edit</Link>
                {/* <DeleteProduct id={product.id}>Delete</DeleteProduct> */}
            </div>
        </ItemStyles>
    )
}