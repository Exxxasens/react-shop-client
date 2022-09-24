import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetOrderQuery } from '../api/orderApi';
import OrderStatusTag from '../components/Order/OrderStatusTag';
import ShortProductList from '../components/Product/ShortProductList';
import { AuthTitle } from '../components/ui/AuthCard';
import { Card } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import Heading from '../components/ui/Heading';
import RowContainer from '../components/ui/RowContainer';
import Table, { Row, Cell } from '../components/ui/Table';
import PageLayout from '../layouts/PageLayout';

const HeadingCell = styled(Cell)`
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const InfoCell = styled(Cell)`
    width: 100%;
`;

const Order = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderQuery(id || '');

    function getTotal(order: IOrder) {
        let total = 0;
        order.products.forEach((item) => (total += item.count * item.product.sellPrice));
        return total;
    }

    function formatPrice(price: number) {
        return price.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        });
    }

    if (!data) {
        return (
            <PageLayout>
                <ColumnContainer style={{ alignItems: 'center' }}>
                    <Card>
                        <AuthTitle>Заказ не найден</AuthTitle>
                    </Card>
                </ColumnContainer>
            </PageLayout>
        );
    }

    return (
        <ColumnContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ColumnContainer>
                <RowContainer>
                    <Heading>Заказ {data._id}</Heading>
                </RowContainer>
                <ColumnContainer style={{ gap: '2rem' }}>
                    <Card>
                        <ColumnContainer>
                            <RowContainer>
                                <AuthTitle>Информация о заказе</AuthTitle>
                            </RowContainer>
                            <Table>
                                <tbody>
                                    <Row>
                                        <HeadingCell>Дата оформления</HeadingCell>
                                        <InfoCell>
                                            {new Date(data.createdAt).toLocaleDateString()}
                                        </InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Сумма</HeadingCell>
                                        <InfoCell>{formatPrice(getTotal(data))}</InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Статус</HeadingCell>
                                        <InfoCell>
                                            <RowContainer>
                                                <OrderStatusTag value={data.status} />
                                            </RowContainer>
                                        </InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Адрес</HeadingCell>
                                        <InfoCell>
                                            {data.address.postCode}, {data.address.region},{' '}
                                            {data.address.city}, {data.address.street}, д.
                                            {data.address.building}
                                        </InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Получатель</HeadingCell>
                                        <InfoCell>{data.fullName}</InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Эл. Почта</HeadingCell>
                                        <InfoCell>{data.email}</InfoCell>
                                    </Row>
                                    <Row>
                                        <HeadingCell>Комментарий</HeadingCell>
                                        <InfoCell>{data.comment}</InfoCell>
                                    </Row>
                                </tbody>
                            </Table>
                        </ColumnContainer>
                    </Card>
                    <Card>
                        <RowContainer>
                            <AuthTitle>Состав заказа</AuthTitle>
                        </RowContainer>
                        <ShortProductList
                            products={data.products.map((item) => ({
                                name: item.product.name,
                                price: item.product.sellPrice,
                                count: item.count,
                                image: item.product.images[0]
                            }))}
                            total={true}
                        />
                    </Card>
                </ColumnContainer>
            </ColumnContainer>
        </ColumnContainer>
    );
};

export default Order;
