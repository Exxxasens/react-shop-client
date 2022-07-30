import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../api/productsApi';
import EditProductForm from '../components/Product/EditProductForm';
import ColumnContainer from '../components/ui/ColumnContainer';

const EditProduct = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductQuery(id || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Product not found!</div>;
    }

    return (
        <ColumnContainer>
            <ColumnContainer style={{ marginTop: '0rem', alignItems: 'center' }}>
                <ColumnContainer style={{ maxWidth: '800px', width: '100%' }}>
                    <EditProductForm product={data} />
                </ColumnContainer>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default EditProduct;
