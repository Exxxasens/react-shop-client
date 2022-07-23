import styled from 'styled-components';
import { Card, CardTitle, CardText } from './Card';
import Message from './Message';

export const AuthCard = styled(Card)`
    display: flex;
    flex-direction: column;
    max-width: 420px;
    width: 100%;
`;

export const AuthTitle = styled(CardTitle)`
    text-align: center;
    margin-bottom: 0.75rem;
`;

export const AuthText = styled(CardText)`
    text-align: center;
    font-weight: 300;
    margin-bottom: 2rem;
    font-size: 1rem;
    a {
        border-bottom: 1px solid;
    }
`;

export const AuthMessage = styled(Message)`
    font-size: 0.85rem;
    font-weight: 300;
    margin-left: 0.25rem;
    margin-top: 0.25rem;
`;

export const SubmitMessage = styled(AuthMessage)`
    font-weight: bold;
    margin-top: -1rem;
`;
