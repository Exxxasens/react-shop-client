import ColumnContainer from '../ui/ColumnContainer';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';
import Input from '../ui/Input';
import SubmitButton from '../ui/SubmitButton';
import { Link } from 'react-router-dom';
import { AuthCard, AuthText, AuthTitle, AuthMessage } from '../ui/AuthCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const loginSchema = zod.object({
    email: zod.string().min(1, 'Поле обязательное для заполнения'),
    password: zod.string().min(1, 'Поле обязательное для заполнения')
});

const resolver = zodResolver(loginSchema);

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({ resolver });

    function onSubmit() {}

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
                <SubmitButton>Войти</SubmitButton>
            </ColumnContainer>
        </AuthCard>
    );
};

export default Login;
