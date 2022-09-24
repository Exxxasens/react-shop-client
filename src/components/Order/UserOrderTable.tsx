import React from 'react';
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetOrdersQuery } from '../../api/orderApi';
import formatPrice from '../../utils/formatPrice';
import ProductImage from '../Product/ProductImage';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';
import RowContainer from '../ui/RowContainer';
import Table, { Cell, Row, TableHeader } from '../ui/Table';
import Tag from '../ui/Tag';
import OrderStatusTag from './OrderStatusTag';

const Price = styled.div`
    font-weight: 600;
    font-size: 0.95rem;
    text-align: center;
`;

const CenteredContainer = styled(RowContainer)`
    justify-content: center;
    align-items: center;
`;

const SmallBtn = styled(Button)`
    padding: 0.5rem 0.75rem;
    display: flex;
    font-size: 0.75rem;
`;

const ProductName = styled.div`
    font-weight: 400;
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    width: 100%;
`;

interface OrderRowProps {
    order: IOrder;
}

const OrderRow = ({ order }: OrderRowProps) => {
    const [isExpand, setExpand] = React.useState(false);

    function getTotal(order: IOrder) {
        let total = 0;
        order.products.forEach((item) => (total += item.count * item.product.sellPrice));
        return total;
    }

    function toggleExpand() {
        setExpand((e) => !e);
    }

    return (
        <>
            <Row>
                <Cell>{new Date(order.createdAt).toLocaleString()}</Cell>
                <Cell>{order._id}</Cell>
                <Cell>
                    <CenteredContainer>
                        <OrderStatusTag value={order.status} />
                    </CenteredContainer>
                </Cell>
                <Cell>
                    <Price>{formatPrice(getTotal(order))}</Price>
                </Cell>
                <Cell style={{ textAlign: 'center' }}>
                    <CenteredContainer style={{ gap: '1rem' }}>
                        <SmallBtn onClick={toggleExpand}>
                            {isExpand ? (
                                <FiArrowUp fontSize="1rem" />
                            ) : (
                                <FiArrowDown fontSize="1rem" />
                            )}
                        </SmallBtn>
                        <Link to={`/order/${order._id}`}>
                            <SmallBtn>Подробнее</SmallBtn>
                        </Link>
                    </CenteredContainer>
                </Cell>
            </Row>
            {isExpand &&
                order.products.map(({ product, count }, i) => {
                    const isLast = order.products.length === i + 1;
                    return (
                        <Row style={isLast ? {} : { borderBottom: 'none' }} key={product.reference}>
                            <Cell as="td" colSpan={2}>
                                <RowContainer style={{ alignItems: 'center' }}>
                                    <ProductImage
                                        src={product.images[0]}
                                        style={{ marginRight: '1rem' }}
                                    />
                                    <ProductName>{product.name || '-'}</ProductName>
                                </RowContainer>
                            </Cell>
                            <Cell>
                                <CenteredContainer>
                                    <Tag background="var(--primary-light-colo)">{count} шт.</Tag>
                                </CenteredContainer>
                            </Cell>
                            <Cell>
                                <CenteredContainer>
                                    <Price>{formatPrice(count * product.sellPrice)}</Price>
                                </CenteredContainer>
                            </Cell>
                            <Cell></Cell>
                        </Row>
                    );
                })}
        </>
    );
};

const UserOrderTable = () => {
    const { data, isLoading } = useGetOrdersQuery();

    return (
        <Card>
            <ColumnContainer>
                <Table>
                    <thead>
                        <TableHeader>
                            <Cell>Дата оформления</Cell>
                            <Cell>Номер заказа</Cell>
                            <Cell style={{ textAlign: 'center' }}>Статус</Cell>
                            <Cell style={{ textAlign: 'center' }}>Сумма заказа</Cell>
                            <Cell style={{ textAlign: 'center' }}>Действие</Cell>
                        </TableHeader>
                    </thead>
                    <tbody>
                        {data && data.map((order) => <OrderRow order={order} key={order._id} />)}
                    </tbody>
                </Table>
            </ColumnContainer>
        </Card>
    );
};

export default UserOrderTable;
