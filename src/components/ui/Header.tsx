import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import RowContainer from './RowContainer';
import IconButton from './IconButton';
import { FiShoppingCart, FiUser, FiAlignJustify } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import Menu from '../Menu';

interface HeaderContainerProps {
    alignContent?: string;
}

const HeaderContainter = styled(RowContainer) <HeaderContainerProps>`
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
    const [displayMenu, setDisplayMenu] = React.useState(false);
    const token = useAppSelector((state) => state.auth.token);
    const menuRef = React.useRef<HTMLDivElement>(null);

    function toggleMenu() {
        setDisplayMenu(prev => !prev);
    }

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!displayMenu) return null;
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setDisplayMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, displayMenu]);

    return (
        <HeaderContainer>
            <HeaderContainter alignContent="left">
                <RowContainer style={{ position: "relative" }} ref={menuRef}>
                    <IconButton icon={<FiAlignJustify />} onClick={toggleMenu}>Каталог</IconButton>
                    {displayMenu && <Menu />}
                </RowContainer>
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
                    {!token && (
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
                    )}
                    {token && (
                        <NavLink to="/user">
                            {({ isActive }) => (
                                <IconButton
                                    icon={<FiUser />}
                                    variant={isActive ? 'active' : 'default'}
                                >
                                    Аккаунт
                                </IconButton>
                            )}
                        </NavLink>
                    )}
                </RowContainer>
            </HeaderContainter>
        </HeaderContainer>
    );
};

export default Header;
