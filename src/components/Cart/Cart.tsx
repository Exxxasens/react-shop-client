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
import IMAGE_PLACEHOLDER from '../../static/image_placeholder.png';
import ProductCountSelector from '../ui/ProductCountSelector';
import RowContainer from '../ui/RowContainer';
import LinkButton from '../ui/LinkButton';
import ProductImage from '../Product/ProductImage';

const ProductList = styled(Card)`
    display: table;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1rem;
    border-radius: 1rem;
`;

const TableRow = styled.div`
    display: table-row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(237, 237, 237);
`;

const Name = styled.div`
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    width: 100%;
`;

const Price = styled.div`
    color: var(--secondary-text-color);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
`;

const RemoveFromCartBtn = styled(Button)`
    padding: 0;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CenteredContainer = styled(ColumnContainer)`
    justify-content: center;
    align-items: center;
`;

const CartCell = styled.td`
    border-bottom: 1px solid rgb(237, 237, 237);
    padding: 1rem 1rem;
    vertical-align: middle;
    border-collapse: collapse;
    color: #566a7f;
`;

interface CartProps {
    checkout?: boolean;
}

const Cart = ({ checkout }: CartProps) => {
    const { products } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    var total = 0;

    function formatPrice(price: number) {
        return price.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        });
    }

    return (
        <ColumnContainer>
            {products.length === 0 && <AuthTitle>Нет товаров в корзине</AuthTitle>}
            {products.length > 0 && (
                <>
                    <ProductList>
                        {products.map((item) => {
                            let imageURL = item.product.images[0]
                                ? `/api/images/${item.product.images[0]}`
                                : IMAGE_PLACEHOLDER;
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
                                <TableRow>
                                    <CartCell>
                                        <ProductImage src={item.product.images[0]} />
                                    </CartCell>
                                    <CartCell style={{ width: '100%' }}>
                                        <Name>{item.product.name}</Name>
                                    </CartCell>
                                    {!checkout && (
                                        <>
                                            <CartCell>
                                                <Price>{formatPrice(item.product.sellPrice)}</Price>
                                            </CartCell>
                                            <CartCell>
                                                <CenteredContainer>
                                                    <ProductCountSelector
                                                        productQuantity={item.product.quantity}
                                                        count={item.count}
                                                        add={addToCart}
                                                        remove={removeFromCart}
                                                    />
                                                </CenteredContainer>
                                            </CartCell>
                                            <CartCell>
                                                <CenteredContainer>
                                                    <RemoveFromCartBtn
                                                        onClick={deleteFromCart}
                                                        variant="outline"
                                                    >
                                                        <FiX />
                                                    </RemoveFromCartBtn>
                                                </CenteredContainer>
                                            </CartCell>
                                        </>
                                    )}
                                    {checkout && (
                                        <CartCell colSpan={3}>
                                            <Price style={{ whiteSpace: 'nowrap' }}>
                                                {item.count} x {formatPrice(item.product.sellPrice)}
                                            </Price>
                                        </CartCell>
                                    )}
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <CartCell colSpan={2}>Общая сумма</CartCell>
                            <CartCell colSpan={3}>
                                <RowContainer style={{ justifyContent: 'flex-end' }}>
                                    {formatPrice(total)}
                                </RowContainer>
                            </CartCell>
                        </TableRow>
                    </ProductList>
                    {!checkout && (
                        <RowContainer style={{ marginLeft: 'auto', marginTop: '1rem' }}>
                            <LinkButton to="/checkout">Оформить заказ</LinkButton>
                        </RowContainer>
                    )}
                </>
            )}
        </ColumnContainer>
    );
};

export default Cart;
