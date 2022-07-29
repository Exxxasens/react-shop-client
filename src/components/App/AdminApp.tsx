import { FiLogOut, FiList, FiPackage } from 'react-icons/fi';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import PageLayout from '../../layouts/PageLayout';
import Products from '../../pages/Products';
import NewProduct from '../../pages/NewProduct';
import useAuth from '../hooks/useAuth';
import { Sidebar, SidebarLink, SidebarTag, SidebarTagLoading } from '../Sidebar';
import RowContainer from '../ui/RowContainer';
import ContextMenu from '../ContextMenu/ContextMenu';

const AppContainer = styled(RowContainer)`
    min-height: 100vh;
`;

const AdminApp = () => {
    const { user, isLoading } = useAuth();

    return (
        <AppContainer>
            <ContextMenu />
            <Sidebar
                style={{
                    gap: '1rem',
                    height: '100vh',
                    position: 'sticky',
                    top: 0
                }}
            >
                {isLoading ? <SidebarTagLoading /> : user && <SidebarTag name={user.name} />}
                <SidebarLink
                    to="orders"
                    title="Заказы"
                    icon={<FiList />}
                    style={{ marginTop: '2rem' }}
                />
                <SidebarLink to="products" title="Товары" icon={<FiPackage />} />
                <SidebarLink
                    to="/auth/logout"
                    title="Выход"
                    icon={<FiLogOut />}
                    style={{ marginTop: 'auto' }}
                />
            </Sidebar>
            <Routes>
                <Route path="products" element={<PageLayout title="Товары" />}>
                    <Route index element={<Products />} />
                    <Route path="create" element={<NewProduct />} />
                </Route>
                <Route path="orders" element={<PageLayout title="Заказы" />} />
            </Routes>
        </AppContainer>
    );
};

export default AdminApp;
