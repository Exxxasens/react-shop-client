import { Link } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';
import { Card } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import LinkButton from '../components/ui/LinkButton';
import RowContainer from '../components/ui/RowContainer';

const Products = () => {
    return (
        <ColumnContainer>
            <RowContainer style={{ marginBottom: '2rem' }}>
                <LinkButton to="create">Добавить новый</LinkButton>
            </RowContainer>
            <ColumnContainer>
                <Card style={{ width: '100%' }}>
                    <ProductList />
                </Card>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default Products;
