import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import RowContainer from '../ui/RowContainer';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: IProduct[];
}

const ProductsContainter = styled.div`
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
`;

const ProductList = ({ products }: ProductListProps) => {
    return <ProductsContainter>
        {products.map(item => <ProductCard product={item} key={item._id} />)}
    </ProductsContainter>
}


export default ProductList;