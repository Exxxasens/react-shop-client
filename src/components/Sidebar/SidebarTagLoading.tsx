import ContentLoader from 'react-content-loader';

const SidebarTagLoading = () => {
    return (
        <ContentLoader
            width="100%"
            height={80}
            backgroundColor="#f1f2f3"
            foregroundColor="#ebf0fe"
        >
            <rect x="0" y="0" rx="12px" ry="12" width="100%" height="100%" />
        </ContentLoader>
    );
};

export default SidebarTagLoading;
