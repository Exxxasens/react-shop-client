import styled from 'styled-components';
import ColumnContainer from './ColumnContainer';
import RowContainer from './RowContainer';

interface CheckBoxInputProps {
    size?: string;
}

const CheckBoxInput = styled.input<CheckBoxInputProps>`
    height: 1.25rem;
    width: 1.25rem;
    accent-color: var(--primary-color);
    ${(props) => props.size && `
        height: ${props.size};
        width: ${props.size};
    `}
`;

interface CheckBoxProps extends React.ComponentProps<typeof CheckBoxInput> {

}

const CheckBox = (props: CheckBoxProps) => {
    return <CheckBoxInput type="checkbox" {...props} />
};

export default CheckBox;
