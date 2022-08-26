import { useGetProductsQuery } from '../api/productsApi';
import ProductList from '../components/Product/ProductList';
import { CardText } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import PageLayout from '../layouts/PageLayout';

const AllProducts = () => {
    const { data, isLoading } = useGetProductsQuery();

    return (
        <ColumnContainer style={{ alignItems: 'center', width: '100%' }}>
            <PageLayout title="Все товары" style={{ width: "auto", padding: '1rem 2rem' }}>
                {data && data.length > 0 && <ProductList products={data} />}
                {data && data.length === 0 && <CardText>Нет товаров</CardText>}
            </PageLayout>
        </ColumnContainer>
    );
};

export default AllProducts;
