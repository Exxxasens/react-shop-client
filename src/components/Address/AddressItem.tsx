import React from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';

const AddressLine = styled.div`
    font-size: 0.95rem;
`;

const AddressItemCard = styled(Card)`
    background: #f1f2f3;
`;

interface AddressItemProps {
    address: IAddress;
}

const AddressItem = ({ address, children }: React.PropsWithChildren<AddressItemProps>) => {
    return (
        <AddressItemCard>
            <ColumnContainer>
                <AddressLine>
                    {address.region}, {address.city},
                </AddressLine>
                <AddressLine>
                    {address.street}, {address.building},
                </AddressLine>
                <AddressLine>{address.postCode}</AddressLine>
            </ColumnContainer>
            {children}
        </AddressItemCard>
    );
};

export default AddressItem;
