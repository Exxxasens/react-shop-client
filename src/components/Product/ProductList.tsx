import { FiEdit, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetProductsQuery, useRemoveProductMutation } from '../../api/productsApi';
import {
    hideContextMenu,
    setContextMenu,
    setPosition,
    showContextMenu
} from '../../store/slices/contextMenuSlice';
import useAppDispatch from '../hooks/useAppDispatch';
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

interface TagProps {
    color?: string;
    background?: string;
}

const Tag = styled.div<TagProps>`
    background: var(--background-color);
    color: var(--secondary-text-color);
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: bold;

    ${(props) => props.color && `color: ${props.color} !important;`}
    ${(props) => props.background && `background: ${props.background} !important;`}
`;

const ProductImage = styled.img`
    height: 64px;
    width: 64px;
    background: var(--border-color);
    border-radius: 4px;
    object-fit: cover;
`;

const ProductName = styled.div`
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--secondary-text-color);
`;

const ProductList = () => {
    const { data, isLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isLoadingDelete }] = useRemoveProductMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onContextMenuOpen = (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
        const contextMenu: IMenuItem[] = [
            {
                title: 'Редактировать',
                icon: <FiEdit />,
                handler: () => {
                    navigate('edit/' + product._id);
                    dispatch(hideContextMenu());
                }
            },
            {
                title: 'Удалить',
                icon: <FiTrash2 />,
                className: 'delete',
                handler: () => {
                    removeProduct(product._id);
                    dispatch(hideContextMenu());
                }
            }
        ];

        const x = e.pageX;
        const y = e.pageY;

        dispatch(setContextMenu(contextMenu));
        dispatch(setPosition({ x, y }));
        dispatch(showContextMenu());
    };

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
                data.map((product: IProduct) => {
                    console.log(product);
                    return (
                        <Row>
                            <Cell>
                                <ColumnContainer>
                                    <RowContainer
                                        style={{
                                            gap: '0.5rem',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {product.images[0] && (
                                            <ProductImage
                                                src={`/api/images/${product.images[0]}`}
                                            />
                                        )}
                                        <ProductName>{product.name || '-'}</ProductName>
                                    </RowContainer>
                                </ColumnContainer>
                            </Cell>
                            <Cell>{product.sellPrice} руб.</Cell>
                            <Cell></Cell>
                            <Cell>
                                <RowContainer style={{ justifyContent: 'center' }}>
                                    {product.show ? (
                                        <Tag
                                            color="var(--primary-light-color)"
                                            background="var(--primary-color)"
                                        >
                                            Показывается
                                        </Tag>
                                    ) : (
                                        <Tag>Не отображается</Tag>
                                    )}
                                </RowContainer>
                            </Cell>
                            <Cell>
                                <CellBtn onClick={(e) => onContextMenuOpen(e, product)}>
                                    <FiMoreVertical />
                                </CellBtn>
                            </Cell>
                        </Row>
                    );
                })}
        </Table>
    );
};

export default ProductList;
