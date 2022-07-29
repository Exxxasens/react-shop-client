import React from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import useAppDispatch from '../hooks/useAppDispatch';

const Logout = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(logout());
    }, []);

    return <Navigate to="/" />;
};

export default Logout;
