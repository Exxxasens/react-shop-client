import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import RowContainer from './RowContainer';
import IconButton from './IconButton';
import { FiShoppingCart, FiUser, FiAlignJustify } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

interface HeaderContainerProps {
    alignContent?: string;
}

const HeaderContainter = styled(RowContainer)<HeaderContainerProps>`
    flex: 1 1 0px;
    align-items: center;

    ${(props) =>
        props.alignContent &&
        `
        justify-content: ${props.alignContent};
    `}
`;

const HeaderContainer = styled(RowContainer)`
    gap: 1rem;
    padding: 1.25rem 3rem;
    border-bottom: 1px solid var(--border-color);
    background: white;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderContainter alignContent="left">
                <IconButton icon={<FiAlignJustify />}>Каталог</IconButton>
            </HeaderContainter>
            <HeaderContainter alignContent="center">
                <RowContainer style={{ maxWidth: '360px', width: '100%' }}>
                    <Input name="search" placeholder="Поиск..." />
                </RowContainer>
            </HeaderContainter>
            <HeaderContainter alignContent="right">
                <RowContainer style={{ gap: '1rem' }}>
                    <NavLink to="cart">
                        {({ isActive }) => (
                            <IconButton
                                icon={<FiShoppingCart />}
                                variant={isActive ? 'active' : 'default'}
                            >
                                Корзина
                            </IconButton>
                        )}
                    </NavLink>
                    <NavLink to="/auth">
                        {({ isActive }) => (
                            <IconButton
                                icon={<FiUser />}
                                variant={isActive ? 'active' : 'default'}
                            >
                                Войти
                            </IconButton>
                        )}
                    </NavLink>
                </RowContainer>
            </HeaderContainter>
        </HeaderContainer>
    );
};

export default Header;
