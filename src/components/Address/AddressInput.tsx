import React from 'react';
import styled from 'styled-components';
import AddressSuggestion from '../../dadata.types';
import Button from '../ui/Button';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';

const SuggestionList = styled(ColumnContainer)`
    align-items: center;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 2rem 0px rgba(39, 40, 48, 0.25);
    position: absolute;
    top: 100%;
    width: 100%;
    margin-top: 0.25rem;
`;

const Suggestion = styled(Button)`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    width: 100%;
    font: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: start;
    font-size: 0.85rem;
    padding: 0.5rem 0.55rem;
    border-radius: 0.25rem;
    &:hover {
        background: rgb(93, 104, 255);
        color: white;
    }
`;

async function fetchSuggestions(query: string): Promise<AddressSuggestion[]> {
    const URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const token = 'c2b26c67a509225c3f7cf060168c6767565e6621';
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + token
        },
        body: JSON.stringify({ query })
    };

    const response = await fetch(URL, options);
    const json = await response.json();

    return json.suggestions;
}

interface AddressInputProps extends React.ComponentProps<typeof Input> {
    onSuggestion?: (suggestion: AddressSuggestion) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({
    onSuggestion,
    onFocus,
    onChange,
    ...rest
}) => {
    const [value, setValue] = React.useState<string>('');
    const [isFocused, setFocused] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([]);
    const refContainer = React.useRef<HTMLDivElement>(null);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        if (onChange) onChange(e);
    }

    React.useEffect(() => {
        const timeout = setTimeout(async () => {
            try {
                const suggestions = await fetchSuggestions(value);
                setSuggestions(suggestions);
                // setFocused(true);
            } catch (error) {
                console.log(error);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [value]);

    React.useEffect(() => {
        function onElementClick(e: MouseEvent) {
            if (e.target && !refContainer.current?.contains(e.target as Node)) {
                setFocused(false);
            }
        }
        if (isFocused) document.addEventListener('click', onElementClick);
        return () => window.document.removeEventListener('click', onElementClick);
    }, [isFocused]);

    function handleSelect(suggestion: AddressSuggestion) {
        onSuggestion && onSuggestion(suggestion);
        setValue(suggestion.value);
        setFocused(false);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        onFocus && onFocus(e);
        setFocused(true);
    }

    return (
        <InputContainer style={{ position: 'relative' }} ref={refContainer}>
            <InputLabel>Адрес:</InputLabel>
            <Input
                role="presentation"
                autocomplete="off"
                name="new-password"
                {...rest}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
            />
            {suggestions.length > 0 && isFocused && (
                <SuggestionList>
                    {suggestions.map((item) => {
                        return (
                            <Suggestion onClick={() => handleSelect(item)} key={item.value}>
                                {item.value}
                            </Suggestion>
                        );
                    })}
                </SuggestionList>
            )}
        </InputContainer>
    );
};

export default AddressInput;
