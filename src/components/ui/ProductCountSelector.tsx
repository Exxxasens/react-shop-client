import { FiMinus, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import Button from "./Button";
import RowContainer from "./RowContainer";

interface AddToCartButtonProps {
    productQuantity: number,
    count: number,
    add: () => any;
    remove: () => any;
}

const Count = styled.div`
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0.5rem;
    width: 2rem;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const CountButton = styled(Button)`
    padding: 0;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.25rem;
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const ProductCountSelector = ({ productQuantity, count, add, remove }: AddToCartButtonProps) => {

    const isAddAvalivable = productQuantity > count;

    return <RowContainer>
        {count === 0 && <Button variant={productQuantity > 0 ? "active" : undefined} disabled={productQuantity === 0} onClick={add}>
            Добавить в корзину
        </Button>}

        {count > 0 && (
            <RowContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
                <CountButton onClick={() => add()} variant={isAddAvalivable ? "active" : undefined} disabled={!isAddAvalivable}>
                    <FiPlus />
                </CountButton>
                <Count>{count}</Count>
                <CountButton onClick={() => remove()} variant="active">
                    <FiMinus />
                </CountButton>
            </RowContainer>
        )}

    </RowContainer>
}

export default ProductCountSelector;