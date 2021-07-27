import { useDispatch } from "react-redux"
import { deleteCompany } from '../store/company/companySlice';

export default function DeleteCompany({id, children}) {
    const dispatch = useDispatch();
    return (
        <button 
            type="button"
            onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                    dispatch(deleteCompany(id));
                }
            }}
        >{children}</button>
        )
}
