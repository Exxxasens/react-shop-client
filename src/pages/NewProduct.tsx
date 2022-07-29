import { Link } from 'react-router-dom';
import { useGetProductQuery } from '../api/productsApi';
import CreateProduct from '../components/Product/ProductForm';
import { Card, CardTitle } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import LinkButton from '../components/ui/LinkButton';
import RowContainer from '../components/ui/RowContainer';

const NewProduct = () => {
    const { data, isLoading } = useGetProductQuery('62e26fbf1ebc851ec1390b41');

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ColumnContainer>
            <ColumnContainer style={{ marginTop: '0rem', alignItems: 'center' }}>
                <ColumnContainer style={{ maxWidth: '800px', width: '100%' }}>
                    <CreateProduct product={data} />
                </ColumnContainer>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default NewProduct;
