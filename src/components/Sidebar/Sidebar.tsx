import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';

export const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
    background: white;

    border-bottom: 1px solid rgb(235, 235, 235);
    border-right: 1px solid rgb(235, 235, 235);

    color: var(--text-color);

    width: 100%;
`;

//${SidebarItemWrapper} {
//    margin: 0.35rem 0;
//}

interface SidebarProps extends React.ComponentProps<typeof SidebarWrapper> {
    children: React.ReactNode | React.ReactNode[];
}

const Sidebar = ({ children, ...rest }: SidebarProps) => {
    return (
        <ColumnContainer style={{ maxWidth: '18rem', width: '100%' }}>
            <SidebarWrapper {...rest}>{children}</SidebarWrapper>
        </ColumnContainer>
    );
};

export default Sidebar;
