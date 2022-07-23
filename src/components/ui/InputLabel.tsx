import styled from 'styled-components';
import RowContainer from './RowContainer';

const InputLabel = styled(RowContainer)`
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    margin-left: 0.25rem;
    color: var(--text-color);
    letter-spacing: 0.25px;
    font-weight: 600;
    text-transform: uppercase;
`;

export default InputLabel;
