import React from 'react';
import styled from 'styled-components';
import { AuthMessage } from '../ui/AuthCard';
import Button from '../ui/Button';
import { Card, CardText, CardTitle } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';
import SubmitButton from '../ui/SubmitButton';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePasswordMutation } from '../../api/userApi';
import Message from '../ui/Message';

const UpdatePasswordCard = styled(Card)`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 1rem;
`;

interface Message {
    text: string;
    type: 'error' | 'success';
}

const updatePasswordSchema = zod
    .object({
        password: zod.string().min(1, 'Поле обязательное для заполнения'),
        newPassword: zod.string().min(1, 'Поле обязательное для заполнения'),
        repeatPassword: zod.string().min(1, 'Поле обязательное для заполнения')
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
        path: ['repeatPassword'],
        message: 'Пароли не сопадают'
    });

const resolver = zodResolver(updatePasswordSchema);

const UpdatePassword = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [message, setMessage] = React.useState<Message | null>(null);
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<UpdatePasswordSchema>({ resolver });

    function onShowForm() {
        setShowForm(true);
    }

    watch(
        React.useCallback(() => {
            if (message) {
                return setMessage(null);
            }
            return null;
        }, [message])
    );

    function onSubmit({ password, newPassword }: UpdatePasswordSchema) {
        reset();
        updatePassword({ password, newPassword })
            .unwrap()
            .then(() => {
                setMessage({ type: 'success', text: 'Пароль успешно изменен' });
            })
            .catch((error) => {
                setMessage({
                    type: 'error',
                    text: error.message || 'Произошла неизвестная ошибка'
                });
            });
    }

    return (
        <UpdatePasswordCard>
            <CardTitle>Изменить пароль</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                est harum praesentium ratione sunt consectetur inventore
                blanditiis fugiat cumque! Tempora, nostrum. Praesentium dolore
                debitis est soluta, mollitia tenetur odio saepe.
            </CardText>
            {showForm && (
                <ColumnContainer
                    as="form"
                    style={{ gap: '1rem', marginTop: '1rem' }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputContainer>
                        <InputLabel>Текущий пароль:</InputLabel>
                        <Input
                            placeholder="Текущий пароль"
                            type="password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <AuthMessage type="error">
                                {errors.password.message}
                            </AuthMessage>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Новый пароль:</InputLabel>
                        <Input
                            placeholder="Новый пароль"
                            type="password"
                            {...register('newPassword')}
                        />
                        {errors.newPassword && (
                            <AuthMessage type="error">
                                {errors.newPassword.message}
                            </AuthMessage>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Повторите новый пароль:</InputLabel>
                        <Input
                            placeholder="Повторите новый пароль"
                            type="password"
                            {...register('repeatPassword')}
                        />
                        {errors.repeatPassword && (
                            <AuthMessage type="error">
                                {errors.repeatPassword.message}
                            </AuthMessage>
                        )}
                    </InputContainer>
                    {message && (
                        <Message type={message.type}>{message.text}</Message>
                    )}
                    <SubmitButton disabled={isLoading}>Изменить</SubmitButton>
                </ColumnContainer>
            )}
            {!showForm && (
                <Button variant="active" onClick={onShowForm}>
                    Изменить пароль
                </Button>
            )}
        </UpdatePasswordCard>
    );
};

export default UpdatePassword;
