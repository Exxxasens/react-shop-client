import ColumnContainer from "../components/ui/ColumnContainer";
import Heading from "../components/ui/Heading";
import RowContainer from "../components/ui/RowContainer";
import PageLayout from "../layouts/PageLayout";
import Cart from "../components/Cart";
import { Card } from "../components/ui/Card";
import InputLabel from "../components/ui/InputLabel";
import Input from "../components/ui/Input";
import useAuth from "../components/hooks/useAuth";
import InputContainer from "../components/ui/InputContainer";
import TextArea from "../components/ui/TextArea";
import React from "react";
import useAppSelector from "../components/hooks/useAppSelector";
import SubmitButton from "../components/ui/SubmitButton";
import ContentLoader from "react-content-loader";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/ui/InputError";
import { useCreateOrderMutation } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

const InputLoading = () => {
    return <ContentLoader
        width="100%"
        height={50}
        backgroundColor="#f1f2f3"
        foregroundColor="#ebf0fe"
    >
        <rect x="0" y="0" rx="12px" ry="12" width="100%" height="100%" />
    </ContentLoader>
}

const checkoutSchema = zod.object({
    user: zod.string(),
    fullName: zod.string().min(1, "Поле обязательное для заполнения"),
    email: zod.string().min(1, "Поле обязательное для заполнения").email(),
    phone: zod.string().min(1, "Поле обязательное для заполнения"),
    comment: zod.string()
})

const resolver = zodResolver(checkoutSchema);

type CheckoutSchema = zod.infer<typeof checkoutSchema>;

const Checkout = () => {
    const { user, isLoading } = useAuth();
    const [requestInfo, setRequestInfo] = React.useState<string>("");
    const navigate = useNavigate();
    const { products } = useAppSelector(state => state.cart);
    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutSchema>({
        resolver,
        shouldUnregister: true,
        defaultValues: {
            user: user?._id,
            fullName: "",
            phone: "",
            comment: "",
            email: ""
        }
    });

    React.useEffect(() => {
        // update user data
        if (user) {
            setValue("user", user._id);
            setValue("fullName", `${user?.name} ${user.lastname}`);
            setValue("email", user.email);
        }

    }, [user])

    function countTotal() {
        let total = 0;
        products.forEach(item => total += item.count * item.product.sellPrice);
        return total;
    }

    function onSubmit(data: CheckoutSchema) {
        if (products.length === 0) { // cart is empty
            return null;
        }

        createOrder({
            ...data,
            products: products.map(item => ({ count: item.count, product: item.product._id }))
        }).unwrap()
            .then(() => navigate("/checkout/success"))
            .catch((error) => {
                setRequestInfo(error.message);
            })

    }

    return <PageLayout>
        <ColumnContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ColumnContainer as="form" onSubmit={handleSubmit(onSubmit)}>
                <Heading>Оформление заказа</Heading>
                <RowContainer style={{ gap: '1rem', flexWrap: "wrap-reverse" }}>
                    <ColumnContainer style={{ flex: '1 0 0' }}>
                        <Card style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                            <h2>Ваши данные</h2>
                            <InputContainer>
                                <InputLabel>Контактные данные:</InputLabel>
                                {!isLoading && <Input placeholder="ФИО" {...register('fullName')} disabled={!!user} />}
                                {isLoading && <InputLoading />}
                                {errors.fullName && <InputError type="error">{errors.fullName.message}</InputError>}
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Электронная почта:</InputLabel>
                                {!isLoading && <Input placeholder="Эл. почта"  {...register('email')} disabled={!!user} />}
                                {isLoading && <InputLoading />}
                                {errors.email && <InputError type="error">{errors.email.message}</InputError>}
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Контактный телефон:</InputLabel>
                                <Input {...register('phone')} />
                                {errors.phone && <InputError type="error">{errors.phone.message}</InputError>}
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Комментарий к заказу:</InputLabel>
                                <TextArea placeholder="Добавьте комментарий к заказу"  {...register('comment')} />
                                {errors.comment && <InputError type="error">{errors.comment.message}</InputError>}
                            </InputContainer>
                            <ColumnContainer>
                                <div style={{ fontWeight: "bold" }}>Общая сумма: {countTotal().toLocaleString("ru-RU", {
                                    style: "currency",
                                    currency: "RUB",
                                    minimumFractionDigits: 0
                                })}</div>
                            </ColumnContainer>
                            <SubmitButton variant="active" type="submit">Оформить</SubmitButton>
                        </Card>
                    </ColumnContainer>
                    <ColumnContainer style={{ flex: '1 0 0' }}>
                        <Cart checkout={true} />
                    </ColumnContainer>
                </RowContainer>
            </ColumnContainer>
        </ColumnContainer>
    </PageLayout>
}

export default Checkout;