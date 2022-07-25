import AddAdress from '../components/Address/AddAddress';
import AddressList from '../components/Address/AddressList';
import { Card, CardText, CardTitle } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import RowContainer from '../components/ui/RowContainer';
import PageLayout from '../layouts/PageLayout';

const UserAddress = () => {
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
                        <ColumnContainer style={{ marginTop: '1rem' }}>
                            <AddressList />
                        </ColumnContainer>
                    </ColumnContainer>
                </Card>
            </RowContainer>
        </PageLayout>
    );
};

export default UserAddress;
