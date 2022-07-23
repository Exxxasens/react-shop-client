import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    variant?: 'active';
}

const Button = styled.button<ButtonProps>`
    background: var(--background-color);
    color: var(--text-color);

    padding: 0.85rem 1.25rem;
    border-radius: 0.75rem;
    border: none;

    cursor: pointer;

    font-family: Inter;
    font-weight: 500;
    font-size: 0.95rem;

    text-decoration: none;

    transition: all 0.2s;

    &:active,
    &:hover {
        color: var(--primary-light-color);
        background: var(--primary-color);
        box-shadow: var(--primary-shadow);
    }

    ${({ variant }) =>
        variant === 'active' &&
        `
        color: var(--primary-light-color);
        background: var(--primary-color);
        box-shadow: var(--primary-shadow);
    `}
`;

export default Button;
