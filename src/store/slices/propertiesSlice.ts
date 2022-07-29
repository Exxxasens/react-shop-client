import { createSlice } from '@reduxjs/toolkit';
import { optionsApi } from '../../api/propertiesApi';

interface PropertiesState {
    properties: IProperty[];
    loaded: boolean;
}

const initialState: PropertiesState = {
    properties: [],
    loaded: false
};

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(optionsApi.endpoints.getProperties.matchFulfilled, (state, action) => {
            state.properties = action.payload;
            state.loaded = true;
        });
        builder.addMatcher(optionsApi.endpoints.createProperty.matchFulfilled, (state, action) => {
            state.properties.push(action.payload);
            state.loaded = true;
        });
        builder.addMatcher(optionsApi.endpoints.removeProperty.matchFulfilled, (state, action) => {
            state.properties = state.properties.filter((item) => item._id !== action.payload._id);
            state.loaded = true;
        });
    }
});

export const optionsReducer = propertiesSlice.reducer;
export const {} = propertiesSlice.actions;
export default propertiesSlice;
