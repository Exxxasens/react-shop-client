import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ColumnContainer from '../components/ui/ColumnContainer';

const Header = styled.h1`
    margin: 2rem 0;
`;

export interface PageLaoutProps {
    title?: string;
}

const PageLayout = ({ title }: PageLaoutProps) => {
    return (
        <ColumnContainer style={{ margin: '1rem 2rem' }}>
            {title && <Header>{title}</Header>}
            <Outlet />
        </ColumnContainer>
    );
};

export default PageLayout;
