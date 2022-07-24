import styled from 'styled-components';

interface MessageProps {
    type: 'success' | 'error' | 'info';
}

const Message = styled.div<MessageProps>`
    ${(props) =>
        props.type === 'success' &&
        `
        color: var(--success-color);
    `}

    ${({ type }) =>
        type === 'error' &&
        `
        color: var(--error-color);
    `}
`;

export default Message;
