import UserOrderTable from '../components/Order';
import PageLayout from '../layouts/PageLayout';

const UserOrderList = () => {
    return (
        <PageLayout title="Мои заказы">
            <UserOrderTable />
        </PageLayout>
    );
};

export default UserOrderList;
