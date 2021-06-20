import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUserInfo } from '../store/user/userSlice';
import AboutTab from './AboutTab';
import EventsList from './EventsList';
import EditInfoTab from './EditInfoTab';
import CompaniesList from './CompaniesList';

export default function Account() {
    const {user, message} = useSelector(({user}) => user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [])
    return (
        <>
            <AboutTab user={user.user}/>
            <EditInfoTab user={user.user} />
            <EventsList events={user.events}/>
            <CompaniesList companies={user.companies} />
        </>
    )
}

