import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    padding: 0.875rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    background: var(--background-color);
    font-family: inherit;
    &:focus {
        outline: none;
        background: white;
        box-shadow: var(--input-shadow);
        border-color: var(--border-color);
        background-clip: padding-box;
    }
    &::placeholder {
        color: #999;
        font-weight: normal;
    }
`;

export default Input;
