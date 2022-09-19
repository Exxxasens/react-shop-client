import ColumnContainer from "../components/ui/ColumnContainer";
import RowContainer from "../components/ui/RowContainer";
import PageLayout from "../layouts/PageLayout";
import Heading from "../components/ui/Heading";
import Cart from "../components/Cart/Cart";

const CartPage = () => {
    return <PageLayout>
        <ColumnContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ColumnContainer>
                <RowContainer>
                    <Heading>Корзина</Heading>
                </RowContainer>
                <Cart />
            </ColumnContainer>
        </ColumnContainer>
    </PageLayout>
}

export default CartPage;