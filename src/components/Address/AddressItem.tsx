import styled from 'styled-components';
import { useRemoveAddressMutation } from '../../api/userApi';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';
import RowContainer from '../ui/RowContainer';

interface AddressItemProps {
    address: IAddress;
}

const AddressLine = styled.div`
    font-size: 0.95rem;
`;

const AddressItemCard = styled(Card)`
    background: #f1f2f3;
`;

const SmallButton = styled(Button)`
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    background: var(--text-color);
    color: var(--primary-light-color);
    &:active,
    &:hover {
        background: var(--error-color);
        box-shadow: var(--error-shadow);
        color: white;
    }
    &:disabled:hover {
        background: var(--text-color) !important;
        color: var(--primary-light-color) !important;
    }
`;

const AddressItem = ({ address }: AddressItemProps) => {
    const [removeAddress, { isLoading }] = useRemoveAddressMutation();

    function onRemove() {
        removeAddress(address._id);
    }

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
                <RowContainer style={{ marginTop: '1rem' }}>
                    <SmallButton disabled={isLoading} onClick={onRemove}>
                        Удалить
                    </SmallButton>
                </RowContainer>
            </ColumnContainer>
        </AddressItemCard>
    );
};

export default AddressItem;
