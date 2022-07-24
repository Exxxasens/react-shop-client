import styled from 'styled-components';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';

interface AddressItemProps {
    address: IAddress;
}

const AddressLine = styled.div`
    font-size: 0.95rem;
`;

const AddressItem = ({ address }: AddressItemProps) => {
    return (
        <Card>
            <ColumnContainer>
                <AddressLine>{address.city},</AddressLine>
                <AddressLine>
                    {address.street}, {address.building},
                </AddressLine>
                <AddressLine>{address.postCode}</AddressLine>
            </ColumnContainer>
        </Card>
    );
};

export default AddressItem;
