import { FiX } from "react-icons/fi";
import styled from "styled-components";
import useAppSelector from "../components/hooks/useAppSelector";
import ProductCountSelector from "../components/ui/ProductCountSelector";
import Button from "../components/ui/Button";
import ColumnContainer from "../components/ui/ColumnContainer";
import RowContainer from "../components/ui/RowContainer";
import PageLayout from "../layouts/PageLayout";
import useAppDispatch from "../components/hooks/useAppDispatch";
import { addProductToCart, removeProductFromCart, deleteProductFromCart } from "../store/slices/cartSlice";
import { AuthTitle } from "../components/ui/AuthCard";
import { Card } from "../components/ui/Card";
import LinkButton from "../components/ui/LinkButton";
import IMAGE_PLACEHOLDER from '../static/image_placeholder.png';

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

const Image = styled.img`
    height: 128px;
    width: 128px;
    object-fit: cover;
    border-radius: 1rem;
    padding: 0.5rem;
`;

const Name = styled.div`
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--secondary-text-color);
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

const CenteredContent = styled(ColumnContainer)`
    justify-content: center;
    align-items: center;
`

const CartCell = styled.td`
    border-bottom: 1px solid rgb(237, 237, 237);
    padding: 1rem 1rem;
    vertical-align: middle;
    border-collapse: collapse;
    color: #566a7f;
`

const Header = styled.h1`
    margin: 2rem 0;
`;

const Cart = () => {
    const { products } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    var total = 0;

    function formatPrice(price: number) {
        return price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });
    }

    return <PageLayout>
        <ColumnContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ColumnContainer>
                <RowContainer>
                    <Header>Корзина</Header>
                </RowContainer>
                {products.length === 0 && <AuthTitle>Нет товаров в корзине</AuthTitle>}
                {products.length > 0 && <><ProductList>
                    {products.map(item => {
                        let imageURL = item.product.images[0] ? `/api/images/${item.product.images[0]}` : IMAGE_PLACEHOLDER;
                        total += item.product.sellPrice * item.count;

                        function addToCart() {
                            dispatch(addProductToCart(item.product))
                        }

                        function removeFromCart() {
                            dispatch(removeProductFromCart(item.product));
                        }

                        function deleteFromCart() {
                            dispatch(deleteProductFromCart(item.product))
                        }

                        return <TableRow>
                            <CartCell>
                                <Image src={imageURL} />
                            </CartCell>
                            <CartCell>
                                <Name>{item.product.name}</Name>
                            </CartCell>
                            <CartCell>
                                <Price>{formatPrice(item.product.sellPrice)}</Price>
                            </CartCell>
                            <CartCell>
                                <CenteredContent>
                                    <ProductCountSelector productQuantity={item.product.quantity} count={item.count} add={addToCart} remove={removeFromCart} />
                                </CenteredContent>
                            </CartCell>
                            <CartCell>
                                <CenteredContent>
                                    <RemoveFromCartBtn onClick={deleteFromCart} variant="outline">
                                        <FiX />
                                    </RemoveFromCartBtn>
                                </CenteredContent>
                            </CartCell>
                        </TableRow>
                    })}
                    <TableRow>
                        <CartCell colSpan={2}>
                            Общая сумма
                        </CartCell>
                        <CartCell colSpan={3}>
                            <RowContainer style={{ justifyContent: 'flex-end' }}>
                                {formatPrice(total)}
                            </RowContainer>
                        </CartCell>
                    </TableRow>
                </ProductList>
                    <RowContainer style={{ marginLeft: 'auto', marginTop: '1rem' }}>
                        <LinkButton to="/checkout" >Оформить заказ</LinkButton>
                    </RowContainer>
                </>}
            </ColumnContainer>
        </ColumnContainer>
    </PageLayout>
}

export default Cart;