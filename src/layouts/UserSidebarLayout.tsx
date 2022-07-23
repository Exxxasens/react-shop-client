import RowContainer from '../components/ui/RowContainer';
import { Sidebar, SidebarLink } from '../components/Sidebar';
import { FiPackage, FiMapPin, FiEdit, FiLogOut } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import SidebarTag from '../components/Sidebar/SidebarTag';

interface UserSidebarLayoutProps {
    children?: React.ReactNode | React.ReactNode[];
}

const UserSidebarLayout = ({ children }: UserSidebarLayoutProps) => {
    return (
        <RowContainer style={{ flexGrow: 1 }}>
            <Sidebar style={{ gap: '1rem' }}>
                <SidebarTag name="Олег" />
                <SidebarLink
                    to="order"
                    title="Мои заказы"
                    icon={<FiPackage />}
                    style={{ marginTop: '2rem' }}
                />
                <SidebarLink
                    to="address"
                    title="Мои адреса"
                    icon={<FiMapPin />}
                />
                <SidebarLink
                    to="account"
                    title="Мои данные"
                    icon={<FiEdit />}
                />
                <SidebarLink
                    to="account"
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
