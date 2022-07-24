import PageLayout from '../layouts/PageLayout';
import UpdatePassword from '../components/User/UpdatePassword';

const UserAccount = () => {
    return (
        <PageLayout title="Мои данные">
            <UpdatePassword />
        </PageLayout>
    );
};

export default UserAccount;
