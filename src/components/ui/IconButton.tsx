import styled from 'styled-components';
import Button from './Button';
import RowContainer from './RowContainer';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
    icon?: React.ReactNode;
}

const Icon = styled(RowContainer)`
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    font-size: 1.25rem;
`;

const IconButtonContainer = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const IconButton = ({ icon, children, ...rest }: React.PropsWithChildren<IconButtonProps>) => {
    return (
        <IconButtonContainer {...rest}>
            <Icon>{icon}</Icon>
            <div>{children}</div>
        </IconButtonContainer>
    );
};

export default IconButton;
