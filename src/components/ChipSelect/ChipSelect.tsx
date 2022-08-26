import React from 'react';
import { Ref } from 'react-hook-form';
import styled from 'styled-components';
import CheckBox from '../ui/CheckBox';
import ColumnContainer from '../ui/ColumnContainer';
import OptionList from '../ui/OptionList';
import Option from '../ui/Option';
import RowContainer from '../ui/RowContainer';

export interface SelectOption {
    title: string;
    value: string;
}

const ChipList = styled(RowContainer)`
    padding: 0.5rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    background: var(--background-color);
    width: 100%;
    cursor: pointer;
`

const Chip = styled.div`
    background: rgba(68, 111, 253, 1);
    color: var(--primary-light-color);
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-radius: 0.5rem;
    font-size: 0.85rem;
`;

const Placeholder = styled.div`
    color: #999;
    font-weight: normal;
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-radius: 0.5rem;
    font-size: 0.85rem;
`;

export interface ChipSelectProps {
    options: SelectOption[];
    onChange: (options: SelectOption[]) => void;
    onBlur?: () => any;
    ref?: Ref;
    placeholder?: string;
    value: SelectOption[];
}

const ChipSelect = ({ options, placeholder, onChange, value, onBlur, ref }: ChipSelectProps) => {
    const [showOptions, setShowOptions] = React.useState(false);
    const refContainer = React.useRef<HTMLDivElement>(null);

    function onOptionSelect(item: SelectOption, checked: boolean) {
        if (checked) {
            return onChange(value.filter(option => option.value !== item.value));
        }

        onChange([...value, item]);
    }

    function isChecked(item: SelectOption) {
        return !!value.find((option) => option.value === item.value);
    }

    function onSelectAll() {
        if (value.length === options.length) {
            return onChange([])
        }
        onChange(options);
    }

    function toggleOptionList() {
        setShowOptions(prev => !prev);
    }

    React.useEffect(() => {
        function onElementClick(e: MouseEvent) {
            if (e.target && !refContainer.current?.contains(e.target as Node)) {
                setShowOptions(false);
                onBlur && onBlur()
            }
        }
        document.addEventListener('click', onElementClick);
        return () => window.document.removeEventListener('click', onElementClick);
    }, []);

    return <ColumnContainer ref={refContainer}>

        <ChipList style={{ gap: '0.5rem' }} onClick={toggleOptionList}>
            {value.length === 0 && placeholder && <Placeholder>{placeholder}</Placeholder>}
            {value.map(item => {
                return <Chip>
                    {item.title}
                </Chip>
            })}
        </ChipList>

        {showOptions && <OptionList style={{
            minWidth: "300px", marginTop: "0.5rem", width: "fit-content"
        }}>
            < RowContainer style={{ width: "100%", padding: "0.5rem 0.75rem" }}>
                <CheckBox type="checkbox" onChange={onSelectAll} size="1rem" checked={value.length === options.length} />
            </RowContainer>
            {
                options.map(item => {
                    const isOptionSelected = isChecked(item);
                    return <Option onClick={() => onOptionSelect(item, isOptionSelected)} type="button">
                        <CheckBox type="checkbox" onChange={() => null} size="1rem" checked={isOptionSelected} style={{ marginRight: "0.5rem" }} />
                        <RowContainer>
                            {item.title}
                        </RowContainer>

                    </Option>

                })
            }
        </OptionList >}
    </ColumnContainer >
}


export default ChipSelect;