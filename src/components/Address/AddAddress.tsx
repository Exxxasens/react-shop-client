import React from 'react';
import { useAddAddressMutation } from '../../api/userApi';
import AddressSuggestion from '../../dadata.types';
import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';
import SubmitButton from '../ui/SubmitButton';
import AddressInput from './AddressInput';

const AddAdress = () => {
    const [message, setMessage] = React.useState<IMessage | null>(null);
    const [address, setAddress] = React.useState<AddressSuggestion | null>(null);
    const [addAddress, { isLoading }] = useAddAddressMutation();

    function onSuggestionSelect(address: AddressSuggestion) {
        const { region_with_type, city, house, street, postal_code } = address.data;

        if (!region_with_type || !city || !house || !postal_code) {
            setMessage({ type: 'error', text: 'Выбран неполный адрес' });
            return setAddress(null);
        }

        setAddress(address);

        return setMessage(null);
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!address) {
            return setMessage({ type: 'error', text: 'Адрес не выбран' });
        }
        const { region_with_type, city, house, street, postal_code } = address.data;
        addAddress({
            region: region_with_type,
            city,
            building: house,
            street,
            postCode: postal_code
        })
            .unwrap()
            .then(() => setMessage({ type: 'success', text: 'Адрес успешно добавлен' }))
            .catch((error) => {
                if (error.data && error.data.message) {
                    return setMessage({ type: 'error', text: error.data.message });
                }
                setMessage({ type: 'error', text: 'Произошла неизвестная ошибка' });
            });
    }

    function handleInputChange() {
        if (message) {
            setMessage(null);
        }
    }

    return (
        <ColumnContainer style={{ width: '100%' }} as="form" onSubmit={onSubmit}>
            <AddressInput
                onSuggestion={onSuggestionSelect}
                onChange={handleInputChange}
                placeholder="Введите адрес"
            />
            {message && (
                <Message type={message.type} style={{ marginTop: '0.5rem' }}>
                    {message.text}
                </Message>
            )}
            <SubmitButton style={{ marginTop: '1rem' }} disabled={isLoading}>
                Добавить адрес
            </SubmitButton>
        </ColumnContainer>
    );
};

export default AddAdress;
