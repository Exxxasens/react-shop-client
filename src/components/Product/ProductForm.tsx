import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';
import RowContainer from '../ui/RowContainer';
import Table, { Cell, Row, TableHeader } from '../ui/Table';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import PropertySelect from './PropertySelect';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useProperties from '../hooks/useProperties';
import { useUpdateProductMutation } from '../../api/productsApi';
import * as zod from 'zod';
import { Card, CardTitle } from '../ui/Card';
import LinkButton from '../ui/LinkButton';
import PropertiesList from './PropertiesList';

const productFormSchema = zod.object({
    name: zod.string(),
    shortDescription: zod.string(),
    description: zod.string(),
    show: zod.boolean(),
    buyPrice: zod.number(),
    sellPrice: zod.number(),
    vendorCode: zod.string(),
    quantity: zod.number(),
    properties: zod.array(zod.string().length(24)),
    variants: zod.array(zod.string().length(24)),
    categories: zod.array(zod.string().length(24))
});

type ProductFormSchema = zod.infer<typeof productFormSchema>;

const CellInput = styled(Input)`
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
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

const ErrorCell = styled(Cell)`
    font-size: 0.85rem;
    text-align: center;
    color: var(--error-color);
`;

const InputCard = styled(ColumnContainer)`
    border-radius: 0.75rem;
    padding: 1.5rem 1rem;
    background: white;
    box-shadow: var(--card-shadow);
    ${InputLabel} {
        // font-size: 0.95rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
`;

const InputDescription = styled(InputLabel)`
    font-size: 0.85rem !important;
    font-weight: 400 !important;
    text-transform: unset !important;
`;

const resolver = zodResolver(productFormSchema);

interface ProductFormProps {
    product: IProduct;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
    const [displayOptionForm, setDisplayOptionForm] = React.useState(false);
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { properties } = useProperties();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: {
            name: product.name || '',
            shortDescription: product.shortDescription || '',
            description: product.description || '',
            show: product.show || false,
            sellPrice: product.sellPrice || 0,
            buyPrice: product.buyPrice || 0,
            vendorCode: product.vendorCode || '',
            quantity: product.quantity || 0,
            variants: product.variants || [],
            properties: product.properties || [],
            categories: product.categories || []
        },
        resolver
    });

    function showOptionForm() {
        setDisplayOptionForm(true);
    }

    function closeOptionForm() {
        setDisplayOptionForm(false);
    }

    function onSubmit(data: any) {
        /*
        updateProduct({
            ...data,
            _id: product._id
        })
            .unwrap()
            .then((product) => {
                console.log(product);
            })
            .catch((error) => {
                console.log(error);
            });
            */
    }

    return (
        <ColumnContainer style={{ gap: '1.5rem' }} onSubmit={handleSubmit(onSubmit)}>
            <CardTitle style={{ marginBottom: '-0.5rem' }}>Новый товар</CardTitle>
            <InputCard>
                <InputLabel>Наименование:</InputLabel>
                <InputDescription>Введите наименование товара</InputDescription>
                <Input placeholder="Введите наименование товара" {...register('name')} />
            </InputCard>
            <InputCard>
                <InputLabel>Краткое описание:</InputLabel>
                <InputDescription>Введите краткое описание товара</InputDescription>
                <TextArea placeholder="Введите описание товара" {...register('shortDescription')} />
            </InputCard>
            <InputCard>
                <InputLabel>Полное описание:</InputLabel>
                <InputDescription>Введите полное описание товара</InputDescription>
                <TextArea placeholder="Введите описание товара" {...register('description')} />
            </InputCard>
            {displayOptionForm && (
                <InputCard>
                    <ColumnContainer style={{ gap: '1rem' }}>
                        <PropertySelect
                            properties={properties}
                            onSelect={(item) => console.log(item)}
                        />
                    </ColumnContainer>
                </InputCard>
            )}
            <InputCard>
                <ColumnContainer>
                    <InputLabel style={{ marginLeft: 0 }}>Свойства:</InputLabel>
                    <InputDescription style={{ marginLeft: 0 }}>
                        Редактируйте свойства товара
                    </InputDescription>
                    <PropertiesList product={product} />
                    <RowContainer style={{ marginTop: '0.5rem' }}>
                        <Button variant="dark" onClick={() => showOptionForm()}>
                            Добавить свойство
                        </Button>
                    </RowContainer>
                </ColumnContainer>
            </InputCard>
            <InputCard style={{ padding: '1rem' }}>
                <Table>
                    <TableHeader>
                        <Cell style={{ textAlign: 'center' }}>Артикул</Cell>
                        <Cell style={{ textAlign: 'center' }}>Цена продажи</Cell>
                        <Cell style={{ textAlign: 'center' }}>Цена закупки</Cell>
                        <Cell style={{ textAlign: 'center' }}>Остаток</Cell>
                    </TableHeader>
                    <Row>
                        <Cell>
                            <CellInput placeholder="-" {...register('vendorCode')} />
                        </Cell>
                        <Cell>
                            <CellInput
                                placeholder="-"
                                {...register('sellPrice', { valueAsNumber: true })}
                            />
                        </Cell>
                        <Cell>
                            <CellInput
                                placeholder="-"
                                {...register('buyPrice', {
                                    valueAsNumber: true
                                })}
                            />
                        </Cell>
                        <Cell>
                            <CellInput
                                placeholder="-"
                                {...register('quantity', { valueAsNumber: true })}
                            />
                        </Cell>
                    </Row>
                    {Object.keys(errors).length > 0 && (
                        <Row style={{ borderBottom: 0 }}>
                            <ErrorCell>{errors.vendorCode?.message}</ErrorCell>
                            <ErrorCell>{errors.sellPrice?.message}</ErrorCell>
                            <ErrorCell>{errors.buyPrice?.message}</ErrorCell>
                            <ErrorCell>{errors.quantity?.message}</ErrorCell>
                        </Row>
                    )}
                </Table>
            </InputCard>
            <RowContainer style={{ gap: '1rem' }}>
                <LinkButton to="../">{'<-'} Назад</LinkButton>
                <Button type="submit" variant="dark" disabled={isLoading}>
                    Сохранить
                </Button>
            </RowContainer>
        </ColumnContainer>
    );
};

export default ProductForm;
