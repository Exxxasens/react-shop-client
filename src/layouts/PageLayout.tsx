import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ColumnContainer from '../components/ui/ColumnContainer';

const Header = styled.h1`
    margin: 2rem 0;
`;

export interface PageLaoutProps {
    title?: string;
    children?: React.ReactNode | React.ReactNode[];
}

const PageLayout = ({ title, children }: PageLaoutProps) => {
    return (
        <ColumnContainer style={{ margin: '1rem 2rem', width: '100%' }}>
            {title && <Header>{title}</Header>}
            {children}
            <Outlet />
        </ColumnContainer>
    );
};

export default PageLayout;
