import React from 'react';
import ContentLoader from 'react-content-loader';
import { useGetCategoriesQuery } from '../../api/categoriesApi';
import ChipSelect, { ChipSelectProps, SelectOption } from './ChipSelect';


type CategoriesChipSelect = Omit<ChipSelectProps, "options">;

const CategoriesChipSelect = (props: CategoriesChipSelect) => {
    const { data, isLoading } = useGetCategoriesQuery();
    
    if (isLoading || !data) {
        return         <ContentLoader
        width="100%"
        height={50}
        backgroundColor="#f1f2f3"
        foregroundColor="#ebf0fe"
    >
        <rect x="0" y="0" rx="12px" ry="12" width="100%" height="100%" />
    </ContentLoader>
    }

    function mapCategoriesToOptions(category: ICategory): SelectOption {
        return {
            title: category.title,
            value: category._id
        }
    }

    return <ChipSelect options={data.map(mapCategoriesToOptions)} {...props}  />
}

export default CategoriesChipSelect;