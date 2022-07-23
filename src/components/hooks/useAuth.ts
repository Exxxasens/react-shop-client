import React from 'react';
import { useGetUserMutation } from '../../api/userApi';
import useAppSelector from './useAppSelector';

const useAuth = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    const [getUser, { isLoading }] = useGetUserMutation();

    React.useEffect(() => {
        if (!user && token) {
            getUser();
        }
    }, []);

    return React.useMemo(
        () => ({ user, token, isLoading }),
        [user, token, isLoading]
    );
};

export default useAuth;
