import Table, { Cell, Row, TableHeader } from '../ui/Table';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import React from 'react';
import Input from '../ui/Input';
import { FiEdit, FiMoreVertical } from 'react-icons/fi';
import {
    hideContextMenu,
    setContextMenu,
    setPosition,
    showContextMenu
} from '../../store/slices/contextMenuSlice';
import useAppDispatch from '../hooks/useAppDispatch';
import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';

interface VariantsFromProps {
    product: IProduct;
}

const variantFormSchema = zod.object({
    sellPrice: zod.number(),
    buyPrice: zod.number(),
    quantity: zod.number(),
    vendorCode: zod.string()
});

const CellInput = styled(Input)`
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    &:focus {
        outline: none;
        background: var(--background-color);
        box-shadow: none;
        border-color: var(--border-color);
        background-clip: padding-box;
    }
    &::placeholder {
        color: #999;
        font-weight: normal;
    }
`;

const SmallButton = styled.button`
    background: none;
    color: var(--text-color);
    padding: 0.25rem;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    border: none;
    outline: none;
    &:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
`;

const resolver = zodResolver(variantFormSchema);

const numberPattern = new RegExp('^[0-9]+$');

const CenteredCell = styled(Cell)`
    text-align: center;
`;

const CleanButton = styled.button`
    all: unset;
    cursor: pointer;
`;

const VariantRow = ({ variant }: { variant: IVariant }) => {
    const [editable, setEditable] = React.useState(false);
    const { vendorCode, sellPrice, buyPrice, quantity } = variant;
    const dispatch = useAppDispatch();

    if (editable) {
        return <EditableVariantRow variant={variant} setEditable={setEditable} />;
    }

    function showMenu(e: React.MouseEvent<HTMLButtonElement>) {
        const x = e.pageX;
        const y = e.pageY;
        dispatch(setPosition({ x, y }));
        dispatch(
            setContextMenu([
                {
                    title: 'Редактировать',
                    icon: <FiEdit />,
                    handler: () => {
                        setEditable(true);
                        dispatch(hideContextMenu());
                    }
                }
            ])
        );
        dispatch(showContextMenu());
    }

    return (
        <Row>
            <Cell>{vendorCode || '-'}</Cell>
            <CenteredCell>{sellPrice} руб.</CenteredCell>
            <CenteredCell>{buyPrice} руб.</CenteredCell>
            <CenteredCell>{quantity} шт</CenteredCell>
            <CenteredCell style={{ fontSize: '1.25rem' }}>
                <CleanButton onClick={showMenu}>
                    <FiMoreVertical />
                </CleanButton>
            </CenteredCell>
        </Row>
    );
};

interface EditableVariantRow {
    setEditable: React.Dispatch<React.SetStateAction<boolean>>;
    variant: IVariant;
}

const EditableVariantRow = ({ variant, setEditable }: EditableVariantRow) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            sellPrice: variant.sellPrice,
            buyPrice: variant.buyPrice,
            quantity: variant.quantity,
            vendorCode: variant.vendorCode
        },
        mode: 'onBlur',
        resolver
    });

    function onSubmit(data: any) {
        console.log(data);
    }

    return (
        <Row as="form" onSubmit={handleSubmit(onSubmit)}>
            <Cell>
                <CellInput
                    placeholder="-"
                    {...register('vendorCode')}
                    style={{ textAlign: 'center' }}
                />
            </Cell>
            <Cell>
                <CellInput
                    placeholder="-"
                    {...register('sellPrice', { valueAsNumber: true })}
                    style={{ textAlign: 'center' }}
                />
            </Cell>
            <Cell>
                <CellInput
                    placeholder="-"
                    {...register('buyPrice', { valueAsNumber: true, pattern: numberPattern })}
                    style={{ textAlign: 'center' }}
                />
            </Cell>
            <Cell>
                <CellInput
                    placeholder="-"
                    {...register('quantity', { valueAsNumber: true })}
                    style={{ textAlign: 'center' }}
                />
            </Cell>
            <Cell>
                <ColumnContainer style={{ gap: '0.5rem' }}>
                    <SmallButton>Сохранить</SmallButton>
                    <SmallButton onClick={() => setEditable(false)}>Отмена</SmallButton>
                </ColumnContainer>
            </Cell>
        </Row>
    );
};

const VariantsTable: React.FC<VariantsFromProps> = ({ product }) => {
    return (
        <Table>
            <TableHeader>
                <Cell>Артикул</Cell>
                <CenteredCell>Цена продажи</CenteredCell>
                <CenteredCell>Цена закупки</CenteredCell>
                <CenteredCell>Остаток</CenteredCell>
                <CenteredCell>Действие</CenteredCell>
            </TableHeader>
            {product.variants.map((variant) => {
                return <VariantRow variant={variant} />;
            })}
        </Table>
    );
};

export default VariantsTable;
