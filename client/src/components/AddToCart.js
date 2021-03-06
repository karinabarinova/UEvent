import {useDispatch } from 'react-redux'
import {addItemToCart} from '../store/cart/cartSlice'

export default function AddToCart({product, openCart}) {
    const dispatch = useDispatch();
    //TODO: Add onClick to add item to state and accept not only id, but the whole product
    function addToCart() {
        const { name, price, image, id } = product
        dispatch(addItemToCart({name, price, image, id}))
        openCart()
    }

    return <button 
        type="button"
        onClick={addToCart}
    > 
        Add To Cart 🛒
    </button>
}
