import styled from 'styled-components';

const RadioInput = styled.input`
    -webkit-appearance: none;
    appearance: none;
    background-color: none;
    margin: 0;
    font: inherit;
    color: var(--primary-color);
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid var(--primary-color);
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
    &::before {
        content: '';
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--primary-color);
        /* Windows High Contrast Mode */
        background-color: CanvasText;
    }
    &:checked::before {
        transform: scale(1);
    }
    &:focus {
        outline: max(2px, 0.15em) solid currentColor;
        outline-offset: max(2px, 0.15em);
    }
`;

export default RadioInput;
