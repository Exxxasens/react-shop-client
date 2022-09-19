import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ColumnContainer from '../components/ui/ColumnContainer';
import Heading from '../components/ui/Heading';

export interface PageLaoutProps extends React.ComponentProps<typeof ColumnContainer> {
    title?: string;
    children?: React.ReactNode | React.ReactNode[];
}

const PageLayout = ({ title, children, ...rest }: PageLaoutProps) => {
    return (
        <ColumnContainer style={{ padding: '1rem 2rem', width: '100%' }} {...rest}>
            {title && <Heading>{title}</Heading>}
            {children}
            <Outlet />
        </ColumnContainer>
    );
};

export default PageLayout;
