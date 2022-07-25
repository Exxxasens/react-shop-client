import styled from 'styled-components';
import useAddress from '../hooks/useAddress';
import { CardText } from '../ui/Card';
import ColumnContainer from '../ui/ColumnContainer';
import AddressItem from './AddressItem';

const EmptyListMessage = styled.div`
    font-weight: bold;
    font-size: 1.125rem;
`;

const AddressList = () => {
    const { address } = useAddress();

    return (
        <ColumnContainer style={{ gap: '1rem' }}>
            {address.map((item) => {
                return <AddressItem address={item} key={item._id} />;
            })}
            {address.length === 0 && (
                <EmptyListMessage>У вас нет добавленных адресов</EmptyListMessage>
            )}
        </ColumnContainer>
    );
};

export default AddressList;
