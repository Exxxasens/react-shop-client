import { useGetProductsQuery } from '../api/productsApi';
import ProductCard from '../components/Product/ProductCard';
import { CardText } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import { ProductsListContainter } from '../components/ui/ProductsListContainer';
import PageLayout from '../layouts/PageLayout';

const AllProducts = () => {
    const { data, isLoading } = useGetProductsQuery();

    return (
        <ColumnContainer style={{ alignItems: 'center', width: '100%' }}>
            <PageLayout title="Все товары" style={{ width: "auto", padding: '1rem 2rem' }}>
                {data && data.length > 0 && <ProductsListContainter >
                    {data.map(item => <ProductCard product={item} />)}
                </ProductsListContainter>}
                {data && data.length === 0 && <CardText>Нет товаров</CardText>}
            </PageLayout>
        </ColumnContainer>
    );
};

export default AllProducts;
