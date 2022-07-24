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
import { useLoginMutation } from '../../api/userApi';
import * as zod from 'zod';

const loginSchema = zod.object({
    email: zod
        .string()
        .email('Некорректная почта')
        .min(1, 'Поле обязательное для заполнения'),
    password: zod.string().min(1, 'Поле обязательное для заполнения')
});

const resolver = zodResolver(loginSchema);

const Login = () => {
    const [error, setError] = React.useState<string | null>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
        reset
    } = useForm<LoginSchema>({ resolver });

    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    watch(
        React.useCallback(() => {
            if (error) {
                setError(null);
            }
        }, [error])
    );

    function onSubmit(values: LoginSchema) {
        setError(null);
        reset({ ...getValues(), password: '' });
        login(values)
            .unwrap()
            .then(() => {
                navigate('/');
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
                <AuthTitle>Войти</AuthTitle>
                <AuthText>
                    Нет аккаунта? <Link to="../register">Регистрация</Link>
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
                <SubmitButton disabled={isLoading}>Войти</SubmitButton>
            </ColumnContainer>
        </AuthCard>
    );
};

export default Login;
