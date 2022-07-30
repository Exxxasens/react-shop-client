import styled from 'styled-components';

const CheckBoxInput = styled.input`
    height: 1.25rem;
    accent-color: var(--primary-color);
`;

interface CheckBoxProps extends React.ComponentProps<typeof CheckBoxInput> {}

const CheckBox = (props: CheckBoxProps) => {
    return <CheckBoxInput type="checkbox" {...props} />;
};

export default CheckBox;
