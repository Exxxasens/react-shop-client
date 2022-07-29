import styled from 'styled-components';

const TextArea = styled.textarea`
    background: var(--background-color);
    padding: 0.875rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: var(--text-color);
    font-family: inherit;
    height: 10rem;

    &:focus {
        outline: none;
        background: white;
        box-shadow: var(--input-shadow);
        border-color: var(--border-color);
        background-clip: padding-box;
    }
    &::placeholder {
        color: #999;
    }
`;

export default TextArea;
