import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartProduct {
    product: IProduct;
    count: number;
}

interface CartState {
    products: ICartProduct[];
}

const initialState: CartState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart(state, { payload }: PayloadAction<IProduct>) {
            const foundProductIndex = state.products.findIndex(item => item.product._id === payload._id);
            if (foundProductIndex >= 0) {
                state.products[foundProductIndex].count += 1;
                return;
            }
            state.products.push({ count: 1, product: payload });
        },
        removeProductFromCart(state, { payload }: PayloadAction<IProduct>) {
            const foundProductIndex = state.products.findIndex(item => item.product._id === payload._id);
            if (foundProductIndex >= 0) {
                state.products[foundProductIndex].count -= 1;
                if (state.products[foundProductIndex].count <= 0) {
                    state.products = state.products.filter(item => item.product._id !== payload._id);
                    return;
                }
            }
        },
        deleteProductFromCart(state, { payload }: PayloadAction<IProduct>) {
            state.products = state.products.filter(item => item.product._id !== payload._id);
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const { addProductToCart, removeProductFromCart, deleteProductFromCart } = cartSlice.actions;
export default cartSlice;