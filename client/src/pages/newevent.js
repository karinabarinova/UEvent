import PleaseSignIn from '../components/PleaseSignIn';
import CreateProduct from '../components/CreateProduct';

export default function NewEventPage(props) {
    return(
        <PleaseSignIn>
            <CreateProduct />
        </PleaseSignIn>
    )
}
