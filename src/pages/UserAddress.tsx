import styled from 'styled-components';
import { useRemoveAddressMutation } from '../api/userApi';
import AddAdress from '../components/Address/AddAddress';
import useAddress from '../components/hooks/useAddress';
import Button from '../components/ui/Button';
import { Card, CardText, CardTitle } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import RowContainer from '../components/ui/RowContainer';
import PageLayout from '../layouts/PageLayout';

const AddressLine = styled.div`
    font-size: 0.95rem;
`;

const EmptyListMessage = styled.div`
    font-weight: bold;
    font-size: 1.125rem;
`;

const SmallButton = styled(Button)`
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    background: var(--text-color);
    color: var(--primary-light-color);
    &:disabled:hover {
        background: var(--primary-light-color) !important;
        color: var(--text-color) !important;
    }
`;

const UserAddress = () => {
    const { address } = useAddress();

    const [removeAddress, { isLoading }] = useRemoveAddressMutation();

    function onRemove(id: string) {
        removeAddress(id);
    }

    return (
        <PageLayout title="Мои адреса">
            <RowContainer style={{ gap: '2rem' }}>
                <Card style={{ maxWidth: '360px', width: '100%', height: 'fit-content' }}>
                    <ColumnContainer>
                        <CardTitle>Добавить адрес</CardTitle>
                        <CardText>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                            saepe corrupti voluptatem consequuntur
                        </CardText>
                        <ColumnContainer style={{ marginTop: '1rem' }}>
                            <AddAdress />
                        </ColumnContainer>
                    </ColumnContainer>
                </Card>
                <Card style={{ maxWidth: '360px', width: '100%', height: 'fit-content' }}>
                    <ColumnContainer>
                        <CardTitle>Мои адреса</CardTitle>
                        <CardText>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                            saepe corrupti voluptatem consequuntur
                        </CardText>
                        <ColumnContainer style={{ marginTop: '1rem', gap: '1rem' }}>
                            {address.map((item) => {
                                return (
                                    <Card
                                        key={item._id}
                                        style={{ background: 'var(--background-color)' }}
                                    >
                                        <ColumnContainer>
                                            <AddressLine>
                                                {item.region}, {item.city},
                                            </AddressLine>
                                            <AddressLine>
                                                {item.street} {item.building},
                                            </AddressLine>
                                            <AddressLine>{item.postCode}</AddressLine>
                                        </ColumnContainer>
                                        <RowContainer style={{ marginTop: '1rem' }}>
                                            <SmallButton
                                                disabled={isLoading}
                                                onClick={() => onRemove(item._id)}
                                            >
                                                Удалить
                                            </SmallButton>
                                        </RowContainer>
                                    </Card>
                                );
                            })}
                            {address.length === 0 && (
                                <EmptyListMessage>У вас нет добавленных адресов</EmptyListMessage>
                            )}
                        </ColumnContainer>
                    </ColumnContainer>
                </Card>
            </RowContainer>
        </PageLayout>
    );
};

export default UserAddress;
