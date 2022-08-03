import React from 'react';
import { useGetProductQuery, useLazyGetProductQuery } from '../../api/productsApi';

export interface InjectedWithProductProps {
    product: IProduct;
    isLoading: boolean;
}

export interface WithProductProps {
    productId: string;
}

export function withProduct<T extends InjectedWithProductProps>(
    WrappedComponent: React.ComponentType<T>
) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithProduct = (
        props: Omit<T & WithProductProps, keyof InjectedWithProductProps>
    ) => {
        const [skip, setSkip] = React.useState(false);
        const { data, isLoading } = useGetProductQuery(props.productId, { skip });

        React.useEffect(() => {
            if (data) {
                setSkip(true);
            }
        }, [data]);

        return <WrappedComponent {...(props as T)} product={data} isLoading={isLoading || !data} />;
    };

    ComponentWithProduct.displayName = `withProduct(${displayName})`;

    return ComponentWithProduct;
}
