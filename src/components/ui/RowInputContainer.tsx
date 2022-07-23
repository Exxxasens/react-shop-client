import styled from 'styled-components';
import Input from './Input';
import RowContainer from './RowContainer';

const RowInputContainer = styled(RowContainer)`
    ${Input}:first-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-right: 0.125rem !important;
    }
    ${Input}:last-of-type {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;

export default RowInputContainer;
