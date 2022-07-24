import AddAdress from '../components/Address/AddAddress';
import { Card, CardText, CardTitle } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import PageLayout from '../layouts/PageLayout';

const UserAddress = () => {
    return (
        <PageLayout title="Мои адреса">
            <Card style={{ maxWidth: '360px', width: '100%' }}>
                <ColumnContainer>
                    <CardTitle>Добавить адрес</CardTitle>
                    <CardText>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio saepe
                        corrupti voluptatem consequuntur
                    </CardText>
                    <ColumnContainer style={{ marginTop: '1rem' }}>
                        <AddAdress />
                    </ColumnContainer>
                </ColumnContainer>
            </Card>
        </PageLayout>
    );
};

export default UserAddress;
