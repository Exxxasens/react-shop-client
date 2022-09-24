import formatPrice from '../../utils/formatPrice';
import CenteredContainer from '../ui/CenteredContainer';
import ProductName from '../ui/ProductName';
import ProductPrice from '../ui/ProductPrice';
import RowContainer from '../ui/RowContainer';
import Table, { Cell, Row, TableHeader } from '../ui/Table';
import Tag from '../ui/Tag';
import ProductImage from './ProductImage';

interface ProductListItem {
    name: string;
    count: number;
    price: number;
    image?: string;
}

export interface ShortProductListProps {
    products: ProductListItem[];
    total?: boolean;
}

const ShortProductList = ({ products, total }: ShortProductListProps) => {
    function getTotal(items: ProductListItem[]) {
        let total = 0;
        items.forEach((item) => (total += item.count * item.price));
        return total;
    }

    return (
        <Table style={{ width: '100%' }}>
            <thead>
                <TableHeader>
                    <Cell>Наименование</Cell>
                    <Cell style={{ textAlign: 'center' }}>Количество</Cell>
                    <Cell style={{ textAlign: 'center' }}>Цена</Cell>
                </TableHeader>
            </thead>
            <tbody>
                {products.map((item) => {
                    return (
                        <Row key={item.name}>
                            <Cell>
                                <RowContainer style={{ alignItems: 'center' }}>
                                    {item.image && (
                                        <ProductImage
                                            src={item.image}
                                            alt={`Image of ${item.name}`}
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                    )}
                                    <ProductName>{item.name}</ProductName>
                                </RowContainer>
                            </Cell>
                            <Cell>
                                <CenteredContainer>
                                    <Tag>{item.count} шт.</Tag>
                                </CenteredContainer>
                            </Cell>
                            <Cell>
                                <ProductPrice>{formatPrice(item.price)}</ProductPrice>
                            </Cell>
                        </Row>
                    );
                })}
                {total && (
                    <Row>
                        <Cell
                            style={{
                                fontSize: '12px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}
                        >
                            Общая сумма
                        </Cell>
                        <Cell></Cell>
                        <Cell>
                            <ProductPrice style={{ textAlign: 'center' }}>
                                {formatPrice(getTotal(products))}
                            </ProductPrice>
                        </Cell>
                    </Row>
                )}
            </tbody>
        </Table>
    );
};

export default ShortProductList;
