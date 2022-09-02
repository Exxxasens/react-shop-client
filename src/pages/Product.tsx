import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/productsApi";
import ProductView from "../components/Product/ProductView";
import ColumnContainer from "../components/ui/ColumnContainer";
import PageLayout from "../layouts/PageLayout";

const Product = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductQuery(id || "");

    return <PageLayout style={{ padding: '2rem', width: "100%" }}>
        <ColumnContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            {data && <ProductView product={data} />}
        </ColumnContainer>
    </PageLayout>
}

export default Product;