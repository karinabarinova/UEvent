import { useDispatch } from "react-redux"
import { deleteEvent } from '../store/products/productSlice';

export default function DeleteEvent({id, children}) {
    const dispatch = useDispatch();
    return (
        <button 
            type="button"
            onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                    dispatch(deleteEvent(id));
                }
            }}
        >{children}</button>
        )
}
