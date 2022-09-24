import ColumnContainer from '../components/ui/ColumnContainer';
import Heading from '../components/ui/Heading';
import RowContainer from '../components/ui/RowContainer';
import PageLayout from '../layouts/PageLayout';
import { Card } from '../components/ui/Card';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import useAuth from '../components/hooks/useAuth';
import InputContainer from '../components/ui/InputContainer';
import TextArea from '../components/ui/TextArea';
import React from 'react';
import useAppSelector from '../components/hooks/useAppSelector';
import SubmitButton from '../components/ui/SubmitButton';
import ContentLoader from 'react-content-loader';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputError from '../components/ui/InputError';
import { useCreateOrderMutation } from '../api/orderApi';
import { useNavigate } from 'react-router-dom';
import ShortProductList from '../components/Product/ShortProductList';
import useAddress from '../components/hooks/useAddress';
import styled from 'styled-components';
import RadioInput from '../components/ui/RadioInput';
import formatPrice from '../utils/formatPrice';
import Button from '../components/ui/Button';
import AddressInput from '../components/Address/AddressInput';
import AddressSuggestion from '../dadata.types';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { useGetAddressMutation } from '../api/userApi';

const AddressLine = styled.div`
    font-size: 0.95rem;
`;

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:focus-within {
        color: var(--primary-color);
    }
`;

const InputLoading = () => {
    return (
        <ContentLoader width="100%" height={50} backgroundColor="#f1f2f3" foregroundColor="#ebf0fe">
            <rect x="0" y="0" rx="12px" ry="12" width="100%" height="100%" />
        </ContentLoader>
    );
};

const checkoutSchema = zod.object({
    user: zod.string(),
    fullName: zod.string().min(1, 'Поле обязательное для заполнения'),
    email: zod.string().min(1, 'Поле обязательное для заполнения').email(),
    phone: zod.string().min(1, 'Поле обязательное для заполнения'),
    comment: zod.string(),
    addressId: zod.string().optional(),
    address: zod.object(
        {
            region: zod.string().min(1, 'Выберите полный адрес из списка'),
            city: zod.string().min(1, 'Выберите полный адрес из списка'),
            postCode: zod.string().min(1, 'Выберите полный адрес из списка'),
            building: zod.string().min(1, 'Выберите полный адрес из списка'),
            street: zod.string().min(1, 'Выберите полный адрес из списка')
        },
        { required_error: 'Адрес не выбран' }
    )
});

const resolver = zodResolver(checkoutSchema);

type CheckoutSchema = zod.infer<typeof checkoutSchema>;

const Checkout = () => {
    const { user, isLoading } = useAuth();
    const [loadAddresses, { data: address, isLoading: isAddressLoading }] = useGetAddressMutation();
    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

    const [requestInfo, setRequestInfo] = React.useState<string>('');
    const [isShowAddressForm, setShowAddressForm] = React.useState(false);

    const navigate = useNavigate();
    const { products } = useAppSelector((state) => state.cart);

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors }
    } = useForm<CheckoutSchema>({
        resolver,
        shouldUnregister: false,
        defaultValues: {
            user: user?._id,
            fullName: '',
            phone: '',
            comment: '',
            email: '',
            addressId: ''
        }
    });

    React.useEffect(() => {
        // update user data
        if (user) {
            setValue('user', user._id);
            setValue('fullName', `${user?.name} ${user.lastname}`);
            setValue('email', user.email);
            loadAddresses();
        }
    }, [user]);

    function countTotal() {
        let total = 0;
        products.forEach((item) => (total += item.count * item.product.sellPrice));
        return total;
    }

    function onSubmit(data: CheckoutSchema) {
        if (products.length === 0) {
            // cart is empty
            return null;
        }

        const payload = {
            user: data.user,
            fullName: data.fullName,
            phone: data.phone,
            comment: data.comment,
            email: data.email,
            address: data.address
        };

        createOrder({
            ...payload,
            products: products.map((item) => ({ count: item.count, product: item.product._id }))
        })
            .unwrap()
            .then(({ _id }) => navigate('/order/' + _id))
            .catch((error) => {
                setRequestInfo(error.message);
            });
    }

    function onAddressInput(address: CheckoutSchema['address']) {
        setValue('address', address);
    }

    function onSuggestion({ data }: AddressSuggestion) {
        setValue('addressId', '');
        resetField('address');
        onAddressInput({
            region: data.region || '',
            city: data.city || '',
            street: data.street || '',
            building: data.house || '',
            postCode: data.postal_code || ''
        });
    }

    function toggleAddressForm() {
        setShowAddressForm((p) => !p);
        resetField('address');
    }

    return (
        <PageLayout>
            <ColumnContainer
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Heading>Оформление заказа</Heading>
                <RowContainer style={{ gap: '1rem', flexWrap: 'wrap-reverse' }}>
                    <ColumnContainer style={{ flex: '2 1 auto', minWidth: '30rem' }}>
                        <ColumnContainer>
                            <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h2>Ваши данные</h2>
                                <InputContainer>
                                    <InputLabel>Контактные данные:</InputLabel>
                                    {!isLoading && (
                                        <Input
                                            placeholder="ФИО"
                                            {...register('fullName')}
                                            disabled={!!user}
                                        />
                                    )}
                                    {isLoading && <InputLoading />}
                                    {errors.fullName && (
                                        <InputError type="error">
                                            {errors.fullName.message}
                                        </InputError>
                                    )}
                                </InputContainer>
                                <InputContainer>
                                    <InputLabel>Электронная почта:</InputLabel>
                                    {!isLoading && (
                                        <Input
                                            placeholder="Эл. почта"
                                            {...register('email')}
                                            disabled={!!user}
                                        />
                                    )}
                                    {isLoading && <InputLoading />}
                                    {errors.email && (
                                        <InputError type="error">{errors.email.message}</InputError>
                                    )}
                                </InputContainer>
                                <InputContainer>
                                    <InputLabel>Контактный телефон:</InputLabel>
                                    <Input {...register('phone')} />
                                    {errors.phone && (
                                        <InputError type="error">{errors.phone.message}</InputError>
                                    )}
                                </InputContainer>
                                <InputContainer>
                                    <InputLabel>Комментарий к заказу:</InputLabel>
                                    <TextArea
                                        placeholder="Добавьте комментарий к заказу"
                                        {...register('comment')}
                                    />
                                    {errors.comment && (
                                        <InputError type="error">
                                            {errors.comment.message}
                                        </InputError>
                                    )}
                                </InputContainer>
                                <ColumnContainer style={{ gap: '0.5rem', maxWidth: '480px' }}>
                                    {address && !isShowAddressForm && (
                                        <>
                                            <InputLabel>Адрес:</InputLabel>
                                            {address &&
                                                address.map((item) => (
                                                    <Card
                                                        style={{
                                                            background: 'var(--background-color)',
                                                            boxShadow: 'none'
                                                        }}
                                                    >
                                                        <RadioLabel>
                                                            <RadioInput
                                                                type="radio"
                                                                id="address"
                                                                {...register('addressId')}
                                                                onChange={() =>
                                                                    onAddressInput(item)
                                                                }
                                                            />
                                                            <RowContainer
                                                                style={{
                                                                    gap: '0.25rem',
                                                                    maxWidth: '360px'
                                                                }}
                                                            >
                                                                <AddressLine>
                                                                    {item.postCode}, {item.region},{' '}
                                                                    {item.city}, {item.street}, д.
                                                                    {item.building}
                                                                </AddressLine>
                                                            </RowContainer>
                                                        </RadioLabel>
                                                    </Card>
                                                ))}
                                        </>
                                    )}

                                    {(!address || isShowAddressForm) && (
                                        <AddressInput
                                            onSuggestion={onSuggestion}
                                            placeholder="Введите адрес"
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                    {errors.address && (
                                        <InputError type="error">
                                            {errors.address.message ||
                                                errors.address.building?.message ||
                                                errors.address.city?.message ||
                                                errors.address.postCode?.message ||
                                                errors.address.region?.message ||
                                                errors.address.street?.message}
                                        </InputError>
                                    )}
                                    {address && (
                                        <RowContainer>
                                            <Button
                                                style={{ fontSize: '0.85rem' }}
                                                type="button"
                                                onClick={toggleAddressForm}
                                            >
                                                {isShowAddressForm
                                                    ? 'Выбрать из списка'
                                                    : 'Добавить новый'}
                                            </Button>
                                        </RowContainer>
                                    )}
                                </ColumnContainer>
                                <ColumnContainer>
                                    <div style={{ fontWeight: 'bold' }}>
                                        Общая сумма: {formatPrice(countTotal())}
                                    </div>
                                </ColumnContainer>
                                <SubmitButton
                                    variant="active"
                                    type="submit"
                                    disabled={isCreatingOrder}
                                >
                                    Оформить
                                </SubmitButton>
                            </Card>
                        </ColumnContainer>
                    </ColumnContainer>
                    <ColumnContainer style={{ flex: '2 1 auto' }}>
                        <ColumnContainer>
                            <Card>
                                <ShortProductList
                                    products={products.map((item) => ({
                                        name: item.product.name,
                                        price: item.product.sellPrice,
                                        count: item.count,
                                        image: item.product.images[0]
                                    }))}
                                    total={true}
                                />
                            </Card>
                        </ColumnContainer>
                    </ColumnContainer>
                </RowContainer>
            </ColumnContainer>
        </PageLayout>
    );
};

export default Checkout;
