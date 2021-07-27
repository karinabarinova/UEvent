import { useSelector } from 'react-redux'
import AboutTab from './AboutTab';
import EventsList from './EventsList';
import EditInfoTab from './EditInfoTab';
import CompaniesList from './CompaniesList';

export default function Account() {
    const {user} = useSelector(({user}) => user);

    return (
        <>
            {Object.keys(user).length !== 0 && (<>
                <AboutTab user={user.user}/>
                <EditInfoTab user={user.user} />
                <EventsList events={user.events}/>
                <CompaniesList companies={user.companies} />
            </>)}
        </>
    )
}

