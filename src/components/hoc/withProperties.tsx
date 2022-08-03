import useProperties from '../hooks/useProperties';

export interface InjectedWithPropertiesProps {
    properties: IProperty[];
    isLoading: boolean;
}

function withProperties<T extends InjectedWithPropertiesProps>(
    WrappedComponent: React.ComponentType<T>
) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithProperties = (props: Omit<T, keyof InjectedWithPropertiesProps>) => {
        const { properties, isLoading } = useProperties();

        return <WrappedComponent {...(props as T)} properties={properties} isLoading={isLoading} />;
    };

    ComponentWithProperties.displayName = `withProduct(${displayName})`;

    return ComponentWithProperties;
}

export default withProperties;
