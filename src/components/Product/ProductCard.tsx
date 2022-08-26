import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';

const ProductContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    width: min-content;
    padding: 1rem;
    border-radius: 0.75rem;
    color: var(--text-color);
    cursor: pointer;
`;

const Image = styled.img`
    height: 240px;
    width: 240px;
    object-fit: cover;
    border-radius: 0.5rem;
    @keyframes move {
        from {
            opacity: 0;
        } 
        to {
            opacity: 1;
        }
    }
    animation-name: move;
    animation-timing-function: linear;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;

const ProductCaption = styled(ColumnContainer)`
    color: black;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
`;

const Name = styled.div`
    display: -webkit-box;
    font-size: 0.95rem;
    font-weight: 500;
    height: 2rem;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 2;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Price = styled.div`
    font-size: 0.95rem;
    font-weight: 800;
`;

const Description = styled.div`
    margin-top: 0.25rem;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1rem;
    max-height: 3rem;
    overflow: hidden;
    color: var(--secondary-text-color);
`;


interface ProductCardProps {
    product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isHover, setHover] = React.useState(false);
    const { images, name } = product;
    const imageURL = images[0] ? `/api/images/${images[0]}` : '/images/image_placeholder.png'
    const secondaryImage = images[1] ? `/api/images/${images[1]}` : imageURL;
    const formattedPrice = product.sellPrice.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
    });
    return (
        <ProductContainer onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <ColumnContainer>
                <Image src={imageURL} style={{ display: isHover && secondaryImage ? "none" : "initial" }} loading="lazy" />
                <Image src={secondaryImage} alt={product.name} style={{ display: isHover ? "initial" : "none" }} loading="lazy" />
            </ColumnContainer>
            <ProductCaption>
                <Name>{name}</Name>
            </ProductCaption>
            <ProductCaption>
                <Price>{formattedPrice}</Price>
            </ProductCaption>
            <ColumnContainer style={{ marginTop: 'auto' }}>
                <Link to={'/product/' + product._id} style={{ marginTop: '0.5rem' }}>
                    <Button style={{ width: '100%' }}>Подробнее</Button>
                </Link>
            </ColumnContainer>
        </ProductContainer>
    );
};

export default ProductCard;
