import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import RowContainer from '../ui/RowContainer';

interface ItemWrapperProps {
    active?: boolean;
}

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    font-size: 1.25rem;
`;

const ItemWrapper = styled(RowContainer)<ItemWrapperProps>`
    justify-content: flex-start;
    align-items: center;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    padding: 0.9rem 1.25rem;
    color: var(--text-color);
    background: var(--background-color);

    transition: all 0.15s;

    &:hover {
        background: var(--primary-color);
        color: var(--primary-light-color);
        box-shadow: var(--primary-shadow);
    }

    ${(props) =>
        props.active &&
        `
        background: var(--primary-color);
        color: var(--primary-light-color);
        box-shadow: var(--primary-shadow);
    `}
`;

export const Text = styled.div`
    font-weight: 600;
`;

interface SidebarItemProps extends NavLinkProps {
    icon: React.ReactNode;
    title: string;
}

const SidebarLink = ({ icon, title, ...rest }: SidebarItemProps) => {
    return (
        <NavLink {...rest}>
            {({ isActive }) => (
                <ItemWrapper active={isActive}>
                    <Icon>{icon}</Icon>
                    <Text>{title}</Text>
                </ItemWrapper>
            )}
        </NavLink>
    );
};

export default SidebarLink;
