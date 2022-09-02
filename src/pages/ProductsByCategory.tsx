import React, { ChangeEvent } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery, useGetCategoryQuery } from "../api/categoriesApi";
import { useGetProductsByCategoryQuery } from "../api/productsApi";
import CategoriesNavigationFilter from "../components/Categories/CategoriesNavigationFilter";
import ProductCard from "../components/Product/ProductCard";
import ProductCardLoading from "../components/Product/ProductCardLoading";
import { Card, CardTitle } from "../components/ui/Card";
import ColumnContainer from "../components/ui/ColumnContainer";
import { ProductsListContainter } from "../components/ui/ProductsListContainer";
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
        <ProductsListContainter>
            {data && data.map(item => <ProductCard product={item} />)}
            {isLoading && new Array(5).fill(null).map(() => <ProductCardLoading />)}
        </ProductsListContainter>
        {data && data.length === 0 && <CardTitle>Нет товаров в этой категории</CardTitle>}
    </ColumnContainer>
}


const ProductsByCategory = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetCategoryQuery(id || "");
    const categories = useGetCategoriesQuery();

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    if (categories.data && data) {
        console.log(categories.data.filter(item => {
            return item.parent === data._id || data.parent === item._id
        }))
    }

    return <ColumnContainer style={{ alignItems: 'center', width: '100%' }}>
        <PageLayout title={data.title} style={{ width: "100%", padding: '1rem 2rem' }}>
            <RowContainer style={{ gap: '1rem' }}>
                {data && <CategoriesNavigationFilter category={data} />}
                {data && <RowContainer style={{ margin: "0 auto" }} >
                    <ProductsRowList category={data} />
                </RowContainer>}
            </RowContainer>
        </PageLayout>
    </ColumnContainer>
}

export default ProductsByCategory;