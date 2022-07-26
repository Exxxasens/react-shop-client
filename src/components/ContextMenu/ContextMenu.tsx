import React, { useMemo } from 'react';
import styled from 'styled-components';
import { hideContextMenu } from '../../store/slices/contextMenuSlice';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';

interface ContextMenuWrapperProps {
    x: number;
    y: number;
}

const ContextMenuWrapper = styled.div<ContextMenuWrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 2rem 0px rgb(0 0 0 / 10%);
    width: max-content;
    .delete {
        &:hover {
            background: var(--error-color);
            color: white;
        }
    }
    ${(props) =>
        props.x &&
        props.y &&
        `
        position: absolute;
        left: ${props.x - 8}px;
        top: ${props.y + 16}px;

    `}
`;

const MenuItem = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    width: 100%;
    font: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    &:hover {
        background: var(--primary-color);
        color: var(--primary-light-color);
    }
`;

const MenuItemDelimiter = styled.div`
    height: 1px;
    background: #aaa;
    margin: 0.5rem 0;
    width: 95%;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
`;

const TitleWrapper = styled.div``;

interface MenuElementProps {
    icon?: React.ReactNode;
    title?: string;
    onClick?: () => any;
    className?: string;
}

const MenuElement = ({ icon, title, onClick = () => null, className = '' }: MenuElementProps) => {
    if (!icon && !title) {
        return <MenuItemDelimiter />;
    }

    return (
        <MenuItem onClick={onClick} className={className}>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {title && <TitleWrapper>{title}</TitleWrapper>}
        </MenuItem>
    );
};

const ContextMenu = () => {
    const { content, show, position } = useAppSelector((state) => state.contextMenu);
    const dispatch = useAppDispatch();
    const menuRef = React.createRef<HTMLDivElement>();

    function closeMenu() {
        dispatch(hideContextMenu());
    }

    React.useEffect(() => {
        if (show && menuRef.current) {
            const width = menuRef.current.clientWidth + position.x;
            const height = menuRef.current.clientHeight + position.y;
            const translateX = width > window.innerWidth ? '-100%' : 0;
            const translateY = height > window.innerHeight ? '-100%' : 0;
            menuRef.current.style.transform = `translate(${translateX}, ${translateY})`;
        }

        function handleMouseDown(e: MouseEvent) {
            const { target } = e;
            const { current } = menuRef;

            if (!target || !current) return null;

            if (target instanceof Element && !current.contains(target)) {
                closeMenu();
            }
        }

        show && document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [show]);

    if (!show) return null;

    return (
        <ContextMenuWrapper x={position.x} y={position.y} ref={menuRef}>
            {show &&
                content.map(({ title, icon, handler, className }, i) => (
                    <MenuElement
                        title={title}
                        icon={icon}
                        onClick={handler}
                        className={className}
                        key={i}
                    />
                ))}
        </ContextMenuWrapper>
    );
};

export default ContextMenu;
