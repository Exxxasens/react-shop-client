import Message from '../components/ui/Message';
import PageLayout from '../layouts/PageLayout';

const RegisterSuccess = () => {
    return (
        <PageLayout title="Аккаунт успешно создан">
            <Message type="success">
                Используйте введенные данные для входа в аккаунт
            </Message>
        </PageLayout>
    );
};

export default RegisterSuccess;
