import React, { ChangeEvent } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCategoryQuery } from "../api/categoriesApi";
import { useGetProductsByCategoryQuery } from "../api/productsApi";
import ProductList from "../components/Product/ProductList";
import { CardTitle } from "../components/ui/Card";
import ColumnContainer from "../components/ui/ColumnContainer";
import RowContainer from "../components/ui/RowContainer";
import SortOptions, { } from "../components/ui/SortOptions";
import PageLayout from "../layouts/PageLayout";

interface ProductsRowListProps {
    category: ICategory;
}

const ProductsRowList = ({ category }: ProductsRowListProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading } = useGetProductsByCategoryQuery({ id: category._id, sort: searchParams.get('sort') || undefined });

    function setSortOption(e: ChangeEvent<HTMLSelectElement>) {
        const sortOption = e.target.value;
        setSearchParams({ sort: sortOption });
    }

    return <ColumnContainer>
        <RowContainer style={{ marginBottom: '1rem' }}>
            <SortOptions onChange={setSortOption} />
        </RowContainer>
        {data && data.length > 0 && <ProductList products={data} />}
        {data && data.length === 0 && <CardTitle>Нет товаров в этой категории</CardTitle>}
    </ColumnContainer>
}


const ProductsByCategory = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetCategoryQuery(id || "");

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    return <ColumnContainer style={{ alignItems: 'center', width: '100%' }}>
        <PageLayout title={data.title} style={{ width: "auto", padding: '1rem 2rem' }}>
            {data && <ProductsRowList category={data} />}
        </PageLayout>
    </ColumnContainer>
}

export default ProductsByCategory;