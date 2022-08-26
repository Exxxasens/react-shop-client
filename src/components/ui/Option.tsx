import styled from "styled-components";
const Option = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    width: 100%;
    font: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-weight: 600;
    &:hover {
        background: rgba(68, 111, 253, 0.85);
        color: var(--primary-light-color);
    }
`;
export default Option;