import React from 'react';
import AddressSuggestion from '../../dadata.types';
import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';
import SubmitButton from '../ui/SubmitButton';
import AddressInput from './AddressInput';

const AddAdress = () => {
    const [message, setMessage] = React.useState<IMessage | null>(null);

    function onSuggestionSelect(address: AddressSuggestion) {
        const { region, city, house, street } = address.data;
        if (!region || !city || !house || !street) {
            return setMessage({ type: 'error', text: 'Выбран неполный адрес' });
        }
        setMessage(null);
        console.log('ok, submitting!');
    }

    return (
        <ColumnContainer style={{ width: '100%' }}>
            <AddressInput onSuggestion={onSuggestionSelect} placeholder="Введите адрес" />
            {message && (
                <Message type={message.type} style={{ marginTop: '0.5rem' }}>
                    {message.text}
                </Message>
            )}
            <SubmitButton style={{ marginTop: '1rem' }}>Добавить адрес</SubmitButton>
        </ColumnContainer>
    );
};

export default AddAdress;
