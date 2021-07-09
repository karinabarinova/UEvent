import PleaseSignIn from '../components/PleaseSignIn';
import CreateCompany from '../components/CreateCompany';

export default function NewCompanyPage(props) {
    return(
        <PleaseSignIn>
            <CreateCompany />
        </PleaseSignIn>
    )
}
