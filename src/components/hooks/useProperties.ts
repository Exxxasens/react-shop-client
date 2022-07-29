import React from 'react';
import { useGetPropertiesMutation } from '../../api/propertiesApi';
import useAppSelector from './useAppSelector';

const useProperties = () => {
    const { properties, loaded } = useAppSelector((state) => state.properties);
    const [getOptions, { isLoading }] = useGetPropertiesMutation();

    React.useEffect(() => {
        if (!loaded) {
            getOptions();
        }
    }, [loaded]);

    return React.useMemo(() => ({ properties, isLoading }), [properties, isLoading]);
};

export default useProperties;
