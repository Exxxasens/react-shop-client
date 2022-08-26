import { Link } from 'react-router-dom';
import ProductTableList from '../components/Product/ProductTableList';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import RowContainer from '../components/ui/RowContainer';

const Products = () => {
    return (
        <ColumnContainer>
            <RowContainer style={{ marginBottom: '2rem' }}>
                <Link to="create"><Button variant="active">Добавить новый</Button></Link>
            </RowContainer>
            <ColumnContainer>
                <Card style={{ width: '100%' }}>
                    <ProductTableList />
                </Card>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default Products;
