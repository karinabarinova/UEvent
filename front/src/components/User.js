import {useSelector } from 'react-redux'

export function useUser() {
    const data = useSelector(({auth}) => auth);
    return data?.user;
}

