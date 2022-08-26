import React from "react";
import ColumnContainer from "./ColumnContainer";
import InputLabel from "./InputLabel";
import OptionList from "./OptionList";
import RowContainer from "./RowContainer"
import Select, { SelectProps } from "./Select";

interface IOption {
    value: any;
    title: string;
}

export enum SortOption {
    DEFAULT = "",
    PRICE_ASC = "sellPrice_asc",
    PRICE_DESC = "sellPrice_desc",
    NAME_ASC = "name_asc",
    NAME_DESC = "name_desc"
}

interface SortOptions extends Omit<SelectProps, "options" | "value"> { }

const SortOptions = (props: SortOptions) => {
    const options: IOption[] = [
        {
            title: "По умолчанию",
            value: SortOption.DEFAULT
        },
        {
            title: "Сначала дорогие",
            value: SortOption.PRICE_ASC
        },
        {
            title: "Сначала дешевые",
            value: SortOption.PRICE_DESC
        },
        {
            title: "По названию ↑",
            value: SortOption.NAME_ASC
        },
        {
            title: "По названию ↓",
            value: SortOption.NAME_DESC
        }
    ]
    return <ColumnContainer>
        <InputLabel>Сортировка:</InputLabel>
        <Select options={options} {...props} />
    </ColumnContainer>
}

export default SortOptions;