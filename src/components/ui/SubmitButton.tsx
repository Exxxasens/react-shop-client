import styled from 'styled-components';
import Button from './Button';

interface SubmitButtonProps {
    disabled?: boolean;
}

const SubmitButton = styled(Button)<SubmitButtonProps>`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    background: var(--primary-color);
    color: var(--primary-light-color);
    font-weight: bold;
    &::after,
    &::before {
        content: '→';
        display: block;
        margin-left: auto;
        font-weight: 700;
        font-size: 1rem;
    }
    &::before {
        margin: 0 auto 0 0;
        visibility: hidden;
    }
    ${(props) =>
        props.disabled &&
        `
        color: var(--text-color);
        background: var(--primary-light-color);
    `}
`;

export default SubmitButton;
