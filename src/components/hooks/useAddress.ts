import React from 'react';
import { useGetAddressMutation } from '../../api/userApi';
import useAppSelector from './useAppSelector';

const useAddress = () => {
    const { address, loaded } = useAppSelector((state) => state.address);
    const [getAddress, { isLoading }] = useGetAddressMutation();

    React.useEffect(() => {
        if (!loaded) {
            getAddress();
        }
    }, []);

    return React.useMemo(() => ({ address, isLoading }), [address, isLoading]);
};

export default useAddress;
