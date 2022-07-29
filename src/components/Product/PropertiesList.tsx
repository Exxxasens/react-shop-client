import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';
import RowContainer from '../ui/RowContainer';

interface PropertiesListProps {
    product: IProduct;
}

const PropertiesList = ({ product }: PropertiesListProps) => {
    return (
        <ColumnContainer>
            {product.properties.map((item) => {
                return (
                    <RowContainer>
                        <div>{item.name}</div>
                        <div>{item.value}</div>
                    </RowContainer>
                );
            })}
            {product.properties.length === 0 && (
                <RowContainer>
                    <Message style={{ fontWeight: 'bold' }} type="info">
                        Нет свойств
                    </Message>
                </RowContainer>
            )}
        </ColumnContainer>
    );
};

export default PropertiesList;
