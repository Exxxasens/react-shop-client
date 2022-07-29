import { FiMoreVertical } from 'react-icons/fi';
import styled from 'styled-components';
import { useGetProductsQuery } from '../../api/productsApi';
import ColumnContainer from '../ui/ColumnContainer';
import RowContainer from '../ui/RowContainer';

import Table, { TableHeader, Row, Cell } from '../ui/Table';

const CellBtn = styled.button`
    border: none;
    outline: none;
    background: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.25rem;
    width: 100%;
    height: 100%;

    &:hover,
    &:active {
        outline: none;
    }
`;

const Tag = styled.div`
    background: var(--background-color);
    color: var(--text-color);
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: bold;
`;

const NameCell = styled(Cell)`
    font-size: 0.95rem;
`;

const ProductList = () => {
    const { data, isLoading } = useGetProductsQuery();

    return (
        <Table style={{ width: '100%', fontSize: '0.85rem' }}>
            <TableHeader>
                <Cell>Товар</Cell>
                <Cell>Цена</Cell>
                <Cell style={{ textAlign: 'center' }}>Категории</Cell>
                <Cell style={{ textAlign: 'center' }}>Отображение</Cell>
                <Cell style={{ textAlign: 'center' }}>Действие</Cell>
            </TableHeader>
            {data &&
                data.map((product: IProduct) => (
                    <Row>
                        <NameCell>
                            <ColumnContainer>
                                <img />
                                <div>{product.name || '-'}</div>
                            </ColumnContainer>
                        </NameCell>
                        <Cell>{product.sellPrice} руб.</Cell>
                        <Cell></Cell>
                        <Cell>
                            <RowContainer style={{ justifyContent: 'center' }}>
                                <Tag>Черновик</Tag>
                            </RowContainer>
                        </Cell>
                        <Cell>
                            <CellBtn onClick={() => console.log('')}>
                                <FiMoreVertical />
                            </CellBtn>
                        </Cell>
                    </Row>
                ))}
        </Table>
    );
};

export default ProductList;
