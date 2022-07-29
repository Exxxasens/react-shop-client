import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const StyledLinkButton = styled(Button)`
    background: var(--text-color);
    color: var(--primary-light-color) !important;
    height: 100%;
`;

interface LinkButtonProps extends NavLinkProps {}

const LinkButton = ({ children, ...rest }: React.PropsWithChildren<LinkButtonProps>) => {
    return (
        <NavLink {...rest}>
            {({ isActive }) => (
                <StyledLinkButton variant={isActive ? 'active' : 'dark'}>
                    {children}
                </StyledLinkButton>
            )}
        </NavLink>
    );
};

export default LinkButton;
