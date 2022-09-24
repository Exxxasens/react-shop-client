import styled from 'styled-components';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { AuthTitle } from '../ui/AuthCard';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';
import {
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart
} from '../../store/slices/cartSlice';
import { FiX } from 'react-icons/fi';
import ProductCountSelector from '../ui/ProductCountSelector';
import RowContainer from '../ui/RowContainer';
import LinkButton from '../ui/LinkButton';
import ProductImage from '../Product/ProductImage';
import Price from '../ui/ProductPrice';
import Table, { Cell, Row } from '../ui/Table';
import ProductName from '../ui/ProductName';
import CenteredContainer from '../ui/CenteredContainer';
import formatPrice from '../../utils/formatPrice';

const RemoveFromCartBtn = styled(Button)`
    padding: 0;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Cart = () => {
    const { products } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    var total = 0;

    return (
        <ColumnContainer>
            {products.length === 0 && (
                <Card>
                    <AuthTitle>Нет товаров в корзине</AuthTitle>
                </Card>
            )}
            {products.length > 0 && (
                <>
                    <Card style={{ padding: '1rem' }}>
                        <Table>
                            {products.map((item) => {
                                total += item.product.sellPrice * item.count;

                                function addToCart() {
                                    dispatch(addProductToCart(item.product));
                                }

                                function removeFromCart() {
                                    dispatch(removeProductFromCart(item.product));
                                }

                                function deleteFromCart() {
                                    dispatch(deleteProductFromCart(item.product));
                                }

                                return (
                                    <Row>
                                        <Cell>
                                            <ProductImage src={item.product.images[0]} />
                                        </Cell>
                                        <Cell style={{ width: '100%' }}>
                                            <ProductName>{item.product.name}</ProductName>
                                        </Cell>
                                        <Cell>
                                            <Price>{formatPrice(item.product.sellPrice)}</Price>
                                        </Cell>
                                        <Cell>
                                            <CenteredContainer>
                                                <ProductCountSelector
                                                    productQuantity={item.product.quantity}
                                                    count={item.count}
                                                    add={addToCart}
                                                    remove={removeFromCart}
                                                />
                                            </CenteredContainer>
                                        </Cell>
                                        <Cell>
                                            <CenteredContainer>
                                                <RemoveFromCartBtn
                                                    onClick={deleteFromCart}
                                                    variant="outline"
                                                >
                                                    <FiX />
                                                </RemoveFromCartBtn>
                                            </CenteredContainer>
                                        </Cell>
                                    </Row>
                                );
                            })}
                            <Row>
                                <Cell colSpan={2}>Общая сумма</Cell>
                                <Cell colSpan={3}>
                                    <RowContainer style={{ justifyContent: 'flex-end' }}>
                                        {formatPrice(total)}
                                    </RowContainer>
                                </Cell>
                            </Row>
                        </Table>
                    </Card>
                    <RowContainer style={{ marginLeft: 'auto', marginTop: '1rem' }}>
                        <LinkButton to="/checkout">Оформить заказ</LinkButton>
                    </RowContainer>
                </>
            )}
        </ColumnContainer>
    );
};

export default Cart;
