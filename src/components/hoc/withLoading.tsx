interface WithLoadingProps {
    isLoading: boolean;
}

const withLoading =
    <P extends object>(
        Component: React.ComponentType<P>,
        Loader: React.ComponentType
    ): React.FC<P & WithLoadingProps> =>
    ({ isLoading, ...rest }) =>
        isLoading ? <Loader /> : <Component {...(rest as P)} />;

export default withLoading;
