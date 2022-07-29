import RowContainer from '../components/ui/RowContainer';
import { Sidebar, SidebarLink, SidebarTag, SidebarTagLoading } from '../components/Sidebar';
import { FiPackage, FiMapPin, FiEdit, FiLogOut, FiDatabase } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import useAuth from '../components/hooks/useAuth';

interface UserSidebarLayoutProps {
    children?: React.ReactNode | React.ReactNode[];
}

const UserSidebarLayout = ({ children }: UserSidebarLayoutProps) => {
    const { user, isLoading } = useAuth();

    return (
        <RowContainer style={{ flexGrow: 1 }}>
            <Sidebar style={{ gap: '1rem' }}>
                {isLoading ? <SidebarTagLoading /> : user && <SidebarTag name={user.name} />}
                <SidebarLink
                    to="order"
                    title="Мои заказы"
                    icon={<FiPackage />}
                    style={{ marginTop: '2rem' }}
                />
                <SidebarLink to="address" title="Мои адреса" icon={<FiMapPin />} />
                <SidebarLink to="account" title="Мои данные" icon={<FiEdit />} />
                {user && user.role === 'admin' && (
                    <SidebarLink to="/admin" title="Управление магазином" icon={<FiDatabase />} />
                )}
                <SidebarLink
                    to="/auth/logout"
                    title="Выход"
                    icon={<FiLogOut />}
                    style={{ marginTop: 'auto' }}
                />
            </Sidebar>
            {children || <Outlet />}
        </RowContainer>
    );
};

export default UserSidebarLayout;
