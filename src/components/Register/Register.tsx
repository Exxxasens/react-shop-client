import React from 'react';
import ColumnContainer from '../ui/ColumnContainer';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';
import Input from '../ui/Input';
import SubmitButton from '../ui/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import {
    AuthCard,
    AuthText,
    AuthTitle,
    AuthMessage,
    SubmitMessage
} from '../ui/AuthCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import RowInputContainer from '../ui/RowInputContainer';
import { useRegisterMutation } from '../../api/userApi';

const emptyStringMessage = 'Поле обязательное для заполнения';

const registerSchema = zod.object({
    email: zod.string().min(1, emptyStringMessage),
    name: zod.string().min(1, emptyStringMessage),
    lastname: zod.string().min(1, emptyStringMessage),
    password: zod.string().min(1, emptyStringMessage)
});

const resolver = zodResolver(registerSchema);

const Register = () => {
    const [error, setError] = React.useState<string | null>('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterSchema>({
        resolver,
        defaultValues: {
            email: '',
            name: '',
            lastname: '',
            password: ''
        }
    });
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterMutation();

    function onSubmit(data: RegisterSchema) {
        registerUser(data)
            .unwrap()
            .then(() => {
                navigate('/register/success');
            })
            .catch((error) => {
                if (error.data && error.data.message) {
                    return setError(error.data.message);
                }
                setError('Произошла неизвестная ошибка');
            });
    }

    return (
        <AuthCard>
            <ColumnContainer>
                <AuthTitle>Авторизация</AuthTitle>
                <AuthText>
                    Уже есть аккаунта? <Link to="../login">Войти</Link>
                </AuthText>
            </ColumnContainer>
            <ColumnContainer
                as="form"
                style={{ marginTop: '2rem', gap: '1.25rem' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputContainer>
                    <InputLabel>Почта:</InputLabel>
                    <Input
                        type="text"
                        placeholder="Введите почту"
                        {...register('email')}
                    />
                    {errors.email && (
                        <AuthMessage type="error">
                            {errors.email.message}
                        </AuthMessage>
                    )}
                </InputContainer>
                <InputContainer>
                    <InputLabel>Контактные данные:</InputLabel>
                    <RowInputContainer>
                        <Input placeholder="Ваше имя" {...register('name')} />
                        <Input
                            placeholder="Ваша фамилия"
                            {...register('lastname')}
                        />
                    </RowInputContainer>
                    {(errors.name || errors.lastname) && (
                        <AuthMessage type="error">
                            {errors.name?.message || errors.lastname?.message}
                        </AuthMessage>
                    )}
                </InputContainer>
                <InputContainer>
                    <InputLabel>Пароль:</InputLabel>
                    <Input
                        type="password"
                        placeholder="Введите пароль"
                        {...register('password')}
                    />
                    {errors.password && (
                        <AuthMessage type="error">
                            {errors.password.message}
                        </AuthMessage>
                    )}
                </InputContainer>
                {error && <SubmitMessage type="error">{error}</SubmitMessage>}
                <SubmitButton>Регистрация</SubmitButton>
            </ColumnContainer>
        </AuthCard>
    );
};

export default Register;
