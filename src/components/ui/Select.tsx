import React from "react";
import Input from "./Input";
import OptionList from "./OptionList";
import Option from "./Option";
import RowContainer from "./RowContainer";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";

interface IOption {
    value: any;
    title: string;
}

export interface SelectProps extends Omit<React.HTMLProps<HTMLSelectElement>, "value"> {
    options: IOption[];
    value?: IOption;
}

interface SelectInputProps {
    focus?: boolean;
}

const SelectInput = styled(RowContainer) <SelectInputProps>`
    width: 100%;
    padding: 0.875rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    background: white;
    font-family: inherit;
    ${props => props.focus && `
        outline: none;
        background: white;
        box-shadow: var(--input-shadow);
        border-color: var(--border-color);
        background-clip: padding-box;
    `}
`;

const Caret = styled.div`
    color: #999;
    font-weight: normal;
    margin-left: 0.25rem;
`;

const Select = ({ options, value, ...rest }: SelectProps) => {
    const [currentValue, setValue] = React.useState<IOption>(value || options[0])
    const [isFocused, setFocused] = React.useState(false);
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    function triggerOnChange(option: IOption) {
        var event = new Event('change', { bubbles: true })
        if (selectRef.current) {
            selectRef.current.value = option.value;
            selectRef.current.dispatchEvent(event);
            setValue(option);
            setFocused(false);
        }
    }

    React.useEffect(() => {
        function onElementClick(e: MouseEvent) {
            if (e.target && !containerRef.current?.contains(e.target as Node)) {
                setFocused(false);
            }
        }
        document.addEventListener('click', onElementClick);
        return () => window.document.removeEventListener('click', onElementClick);
    }, [isFocused]);

    return <ColumnContainer ref={containerRef} style={{ position: 'relative' }}>
        <select ref={selectRef} {...rest} style={{ display: 'none' }}>
            {options.map(item => <option value={item.value} key={item.value}>{item.title}</option>)}
        </select>
        <SelectInput onClick={() => setFocused(true)} focus={isFocused}>
            {currentValue.title}
            <Caret>
                {isFocused ? '▲' : "▼"}
            </Caret>
        </SelectInput>
        {isFocused && <OptionList style={{ marginTop: '0.25rem', position: 'absolute', top: "100%", zIndex: 999 }}>
            {options.map(item => <Option onClick={() => triggerOnChange(item)}>{item.title}</Option>)}
        </OptionList>}
    </ColumnContainer>
}

export default Select;