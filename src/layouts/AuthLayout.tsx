import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ColumnContainer from '../components/ui/ColumnContainer';

const AuthLayoutContainer = styled(ColumnContainer)`
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const AuthLayout = () => {
    return (
        <AuthLayoutContainer>
            <Outlet />
        </AuthLayoutContainer>
    );
};

export default AuthLayout;
