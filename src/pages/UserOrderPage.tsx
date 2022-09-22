
import UserOrderTable from "../components/Order";
import PageLayout from "../layouts/PageLayout";

const UserOrderPage = () => {
    return <PageLayout title="Мои заказы">
        <UserOrderTable />
    </PageLayout>
}

export default UserOrderPage;