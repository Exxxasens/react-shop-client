import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    variant?: 'active' | 'dark' | 'outline';
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

    &:disabled:hover {
        background: var(--background-color);
        color: var(--text-color);
        box-shadow: none;
    }

    ${({ variant }) =>
        variant === 'active' &&
        `
        color: var(--primary-light-color);
        background: var(--primary-color);
        box-shadow: var(--primary-shadow);
    `}

    ${({ variant }) =>
        variant === 'outline' &&
        `
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        background: transparent;
    `}

    ${({ variant }) =>
        variant === 'dark' &&
        `
        color: var(--primary-light-color);
        background: var(--text-color);
        box-shadow: none;
    `}
`;

export default Button;
