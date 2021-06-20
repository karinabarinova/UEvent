import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUserInfo } from '../store/user/userSlice';
// import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import AboutTab from './AboutTab';
import EventsList from './EventsList';

export default function Account() {
    const {user, message} = useSelector(({user}) => user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [])
    return (
        <>
            <AboutTab user={user.user}/>
            <EventsList events={user.events}/>
        </>
    )
}

