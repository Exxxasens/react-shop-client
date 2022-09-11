import styled from "styled-components";
import { addProductToCart, removeProductFromCart } from "../../store/slices/cartSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import AddToCartButton from "../ui/ProductCountSelector";

import { Card } from "../ui/Card";
import ColumnContainer from "../ui/ColumnContainer";
import RowContainer from "../ui/RowContainer";
import IMAGE_PLACEHOLDER from '../../static/image_placeholder.png'

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
    justify-content: center;
    //align-items: center;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Image = styled.img`
    max-width: 480px;
    width: 100%;
    border-radius: 0.5rem;
`;

const Label = styled.div`
    font-weight: bold;
    font-size: 0.85rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #566a7f;
`;

const Name = styled.div`
    font-size: 2rem;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 3rem;
`;

const Description = styled.div`
    font-size: 0.95rem;
    font-weight: 500;
`;

const Price = styled.div`
    color: tomato;
    font-size: 1.25rem;
    font-weight: bold;
`;

const PropertiesList = styled(ColumnContainer)`
    font-size: 0.95rem;
    gap: 0.5rem;
`;

const Property = styled(RowContainer)`
`

const PropertyName = styled(RowContainer)`
    color: var(--text-color);   
    font-weight: 400;
    margin-right: 0.5rem;
`

const PropertyValue = styled(RowContainer)`    
    font-weight: 400;
    color: var(--natural-color);
`

interface ProductViewProps {
    product: IProduct;
}

const ProductView = ({ product }: ProductViewProps) => {
    const { name, images, shortDescription, description, sellPrice, quantity, properties } = product;
    const isAvailable = quantity > 0;
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.cart);

    function addToCart() {
        console.log('dispatch add to cart');
        dispatch(addProductToCart(product));
    }

    function removeFromCart() {
        console.log('dispatch remove from cart');
        dispatch(removeProductFromCart(product));
    }

    const currentProductInCart = products.find(item => item.product._id === product._id);

    function formatPrice(price: number) {
        return price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        });
    }

    return (
        <Wrapper>
            <ImageWrapper style={{ gap: '1rem' }}>
                {images.map(i => (
                    <Image src={`/api/images/${i}`} />
                ))}
                {images.length === 0 && <Image src={IMAGE_PLACEHOLDER} />}
            </ImageWrapper>
            <ColumnContainer style={{ maxWidth: '480px', width: '100%', gap: "1rem" }}>
                <Name>{name}</Name>
                {shortDescription && <Card>
                    <Label style={{ marginBottom: "1rem" }}>Краткое описание: </Label>
                    <Description>{shortDescription}</Description>
                </Card>}
                {properties.length > 0 &&
                    <Card>
                        <Label style={{ marginBottom: "1rem" }}>Характеристики:</Label>
                        <PropertiesList style={{ marginTop: '0.5rem' }}>
                            {properties.map(item => <Property>
                                <PropertyName>{item.name}:</PropertyName>
                                <PropertyValue>{item.value}</PropertyValue>
                            </Property>)}
                        </PropertiesList>
                    </Card>
                }
                <Card>
                    <Label style={{ marginBottom: "1rem" }}>Цена: </Label>
                    <Price>{formatPrice(sellPrice)}</Price>
                    <Label style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>{isAvailable ? "Есть в наличии" : "Нет в наличии"}</Label>
                    <RowContainer style={{ marginTop: '1rem' }}>
                        <AddToCartButton add={addToCart} remove={removeFromCart} count={currentProductInCart?.count || 0} productQuantity={product.quantity} />
                    </RowContainer>
                </Card>
                <Card>
                    <Label style={{ marginBottom: "1rem" }}>Описание: </Label>
                    <Description>{description || "У товара нет описания"}</Description>
                </Card>
            </ColumnContainer>
        </Wrapper>
    );
};

export default ProductView;