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
import Tag from '../ui/Tag';
import ProductImage from './ProductImage';

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

const ProductName = styled.div`
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--secondary-text-color);
`;

const ProductTableList = () => {
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

    function formatPrice(price: number) {
        return price.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        });
    }

    return (
        <Table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
                <TableHeader>
                    <Cell>Товар</Cell>
                    <Cell>Цена</Cell>
                    <Cell style={{ textAlign: 'center' }}>Категории</Cell>
                    <Cell style={{ textAlign: 'center' }}>Отображение</Cell>
                    <Cell style={{ textAlign: 'center' }}>Действие</Cell>
                </TableHeader>
            </thead>
            <tbody>
                {data &&
                    data.map((product: IProduct) => {
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
                                            <ProductImage src={product.images[0]} />
                                            <ProductName>{product.name || '-'}</ProductName>
                                        </RowContainer>
                                    </ColumnContainer>
                                </Cell>
                                <Cell style={{ fontWeight: 800 }}>
                                    {formatPrice(product.sellPrice)}
                                </Cell>
                                <Cell>
                                    <RowContainer style={{ gap: '0.25rem', flexWrap: 'wrap' }}>
                                        {product.categories.length === 0 && (
                                            <Tag background="none">
                                                Товар не добавлен ни в одну категорию
                                            </Tag>
                                        )}
                                        {product.categories.slice(0, 3).map((item) => (
                                            <Tag>{item.title}</Tag>
                                        ))}
                                        {product.categories.length > 3 && <Tag>...</Tag>}
                                    </RowContainer>
                                </Cell>
                                <Cell>
                                    <RowContainer style={{ justifyContent: 'center' }}>
                                        {product.show ? (
                                            <Tag
                                                color="var(--primary-light-color)"
                                                background="var(--primary-color)"
                                                style={{
                                                    fontSize: '0.8rem',
                                                    padding: '0.5rem 0.75rem'
                                                }}
                                            >
                                                Показывается
                                            </Tag>
                                        ) : (
                                            <Tag
                                                style={{
                                                    fontSize: '0.8rem',
                                                    padding: '0.5rem 0.75rem'
                                                }}
                                            >
                                                Не отображается
                                            </Tag>
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
            </tbody>
        </Table>
    );
};

export default ProductTableList;
