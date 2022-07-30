import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import RowContainer from '../ui/RowContainer';
import Table, { Cell, Row, TableHeader } from '../ui/Table';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import PropertySelect from './PropertySelect';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProductMutation } from '../../api/productsApi';
import * as zod from 'zod';
import { CardTitle } from '../ui/Card';
import LinkButton from '../ui/LinkButton';
import PropertiesList from './PropertiesList';
import ImageUploader from '../Image/ImageUploader';
import InputDescription from '../ui/InputDescription';
import useAppDispatch from '../hooks/useAppDispatch';
import { setContent, show, hide } from '../../store/slices/popupSlice';
import CheckBox from '../ui/CheckBox';

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

const resolver = zodResolver(productFormSchema);

interface EditProductFormProps {
    product: IProduct;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const {
        register,
        setValue,
        getValues,
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
            categories: product.categories || []
        },
        resolver
    });

    const [properties, setProperties] = React.useState<IProperty[]>(product.properties);

    function addProperty(property: IProperty) {
        setProperties((p) => {
            return [...p.filter((item) => item._id !== property._id), property];
        });
        dispatch(hide());
    }

    function removeProperty({ _id }: IProperty) {
        setProperties((p) => {
            return p.filter((item) => item._id !== _id);
        });
    }

    function showOptionPopup() {
        dispatch(
            setContent(
                <>
                    <CardTitle>Новое свойство</CardTitle>
                    <PropertySelect onSelect={(property) => addProperty(property)} />
                </>
            )
        );
        dispatch(show());
    }

    function onSubmit(data: ProductFormSchema) {
        const update: IUpdateProduct = {
            ...data,
            properties: properties.map((item) => item._id),
            variants: [],
            categories: [],
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

    console.log(errors);
    console.log(getValues());

    return (
        <ColumnContainer style={{ gap: '1.5rem' }} onSubmit={handleSubmit(onSubmit)} as="form">
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
                <ImageUploader />
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
                        <Button variant="dark" onClick={() => showOptionPopup()}>
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

export default EditProductForm;
