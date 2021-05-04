import {Link} from 'react-router-dom';
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
// import DeleteProduct from './DeleteProduct'

export default function Product({product}) {
    return (
        <ItemStyles>
            <img src="" alt="name" />
            <Title>
                <Link href="">Name</Link>
            </Title>
            <PriceTag>70$</PriceTag>
            <p>Description</p>
            <div className="buttonList">
                <Link>Edit</Link>
                {/* <DeleteProduct id={product.id}>Delete</DeleteProduct> */}
            </div>
        </ItemStyles>
    )
}