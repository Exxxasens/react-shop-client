import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';

interface AddressState {
    address: IAddress[];
    loaded: boolean;
}

const initialState: AddressState = {
    address: [],
    loaded: false
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.getAddress.matchFulfilled, (state, action) => {
            state.address = action.payload;
            state.loaded = true;
        });
        builder.addMatcher(userApi.endpoints.addAddress.matchFulfilled, (state, action) => {
            state.address.push(action.payload);
        });
        builder.addMatcher(userApi.endpoints.removeAddress.matchFulfilled, (state, action) => {
            state.address = state.address.filter((item) => item._id !== action.payload._id);
        });
    }
});

export const addressReducer = addressSlice.reducer;
export const {} = addressSlice.actions;
export default addressSlice;
