import styled from "styled-components";

export interface TagProps {
    color?: string;
    background?: string;
}

const Tag = styled.div<TagProps>`
    background: var(--background-color);
    color: var(--secondary-text-color);
    border-radius: 1rem;
    font-weight: bold;
    font-size: 0.75rem; 
    padding: 0.5rem 0.75rem;    
    text-align: center;

    ${(props) => props.color && `color: ${props.color} !important;`}
    ${(props) => props.background && `background: ${props.background} !important;`}
`;

export default Tag;