import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Admin(props) {
    const { user } = useAuth();

    useEffect(() => console.log(user), []);
    return <>Alo</>;
}
