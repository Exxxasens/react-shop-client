import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import RowContainer from '../ui/RowContainer';
import Table, { Cell, Row, TableHeader } from '../ui/Table';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProductMutation } from '../../api/productsApi';
import * as zod from 'zod';
import { CardTitle } from '../ui/Card';
import LinkButton from '../ui/LinkButton';
import PropertiesList from './PropertiesList';
import InputDescription from '../ui/InputDescription';
import ProductImageUploader from './ProductImageUploader';
import { withProduct } from '../hoc/withProduct';
import withLoading from '../hoc/withLoading';
import PropertySelect from './PropertySelect';
import { useSearchParams } from 'react-router-dom';
import Popup from '../Popup';
import { SelectOption } from '../ChipSelect/ChipSelect';
import CategoriesChipSelect from '../ChipSelect/CategoriesChipSelect';

const productFormSchema = zod.object({
    name: zod.string(),
    shortDescription: zod.string(),
    description: zod.string(),
    show: zod.boolean(),
    buyPrice: zod.number(),
    sellPrice: zod.number(),
    vendorCode: zod.string(),
    quantity: zod.number(),
    variants: zod.array(zod.string().length(24)),
    categories: zod.array(zod.object({
        value: zod.string(),
        title: zod.string()
    }))
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

const resolver = zodResolver(productFormSchema);

interface EditProductFormProps {
    product: IProduct;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const {
        register,
        control,
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
            categories: product.categories.map(category => ({ title: category.title, value: category._id } as SelectOption)) || []
        },
        resolver,
        mode: 'onSubmit'
    });

    const [properties, setProperties] = React.useState<IProperty[]>(product.properties);

    function addProperty(property: IProperty) {
        setProperties((p) => {
            return [...p.filter((item) => item._id !== property._id), property];
        });
        closePropertyPopup();
    }

    function removeProperty({ _id }: IProperty) {
        setProperties((p) => {
            return p.filter((item) => item._id !== _id);
        });
    }

    function onSubmit(data: ProductFormSchema) {
        console.log(data);
        const update: IUpdateProduct = {
            ...data,
            properties: properties.map((item) => item._id),
            categories: data.categories.map(item => item.value),
            variants: [],
            _id: product._id
        };
        updateProduct(update)
            .unwrap()
            .then((product) => {
                console.log(product);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function showPropertyPopup() {
        setSearchParams({ add_property: 'true' });
    }

    function closePropertyPopup() {
        setSearchParams({});
    }

    return (
        <ColumnContainer style={{ gap: '1.5rem' }} onSubmit={handleSubmit(onSubmit)} as="form">
            {searchParams.get('add_property') === 'true' && (
                <Popup onClose={closePropertyPopup}>
                    <CardTitle>Новое свойство</CardTitle>
                    <PropertySelect onSelect={(property: IProperty) => addProperty(property)} />
                </Popup>
            )}
            <CardTitle style={{ marginBottom: '-0.5rem' }}>Новый товар</CardTitle>
            <RowContainer style={{ gap: '1rem' }}>
                <InputCard style={{ flexGrow: 1 }}>
                    <InputLabel>Наименование:</InputLabel>
                    <InputDescription>Введите наименование товара</InputDescription>
                    <Input placeholder="Введите наименование товара" {...register('name')} />
                </InputCard>
                <InputCard>
                    <InputLabel>Отображение:</InputLabel>
                    <InputDescription>Отображать товар на сайте?</InputDescription>
                    <RowContainer>
                        <input
                            type="checkbox"
                            style={{ height: '1.25rem', accentColor: 'var(--primary-color)' }}
                            {...register('show')}
                        />
                    </RowContainer>
                </InputCard>
            </RowContainer>
            <InputCard>
                <InputLabel>Изображение:</InputLabel>
                <InputDescription>Добавьте изображение</InputDescription>
                <ProductImageUploader product={product} />
            </InputCard>
            <InputCard>
                <InputLabel>Категории:</InputLabel>
                <InputDescription>Выберите категории для товара</InputDescription>
                <Controller name="categories" control={control} shouldUnregister={true} render={({ field }) => {
                    console.log(field);
                    return <CategoriesChipSelect onChange={field.onChange} value={field.value} placeholder="Выберите из списка"/>
                }}/>
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
            <InputCard>
                <ColumnContainer>
                    <InputLabel style={{ marginLeft: 0 }}>Свойства:</InputLabel>
                    <InputDescription style={{ marginLeft: 0 }}>
                        Редактируйте свойства товара
                    </InputDescription>
                    <PropertiesList properties={properties} onRemove={removeProperty} />
                    <RowContainer style={{ marginTop: '0.5rem' }}>
                        <Button variant="dark" onClick={showPropertyPopup}>
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

export default withProduct(withLoading(EditProductForm, () => <div>Loading</div>));
