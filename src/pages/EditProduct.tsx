import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../api/productsApi';
import EditProductForm from '../components/Product/EditProductForm';
import ColumnContainer from '../components/ui/ColumnContainer';

const EditProduct = () => {
    const { id } = useParams();

    return (
        <ColumnContainer>
            <ColumnContainer style={{ marginTop: '0rem', alignItems: 'center' }}>
                <ColumnContainer style={{ maxWidth: '800px', width: '100%' }}>
                    <EditProductForm productId={id || ''} />
                </ColumnContainer>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default EditProduct;
