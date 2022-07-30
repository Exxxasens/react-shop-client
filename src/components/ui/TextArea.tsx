import styled from 'styled-components';

const TextArea = styled.textarea`
    background: var(--background-color);
    color: var(--text-color);

    padding: 0.875rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    height: 10rem;

    &:focus {
        outline: none;
        background: transparent;
        box-shadow: var(--input-shadow);
        border-color: var(--border-color);
        background-clip: padding-box;
    }
    &::placeholder {
        color: #999;
    }
`;

export default TextArea;
