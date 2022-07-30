import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';

interface PopupState {
    content: React.ReactNode | React.ReactNode[];
    show: boolean;
}

const initialState: PopupState = {
    content: [],
    show: false
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        show(state) {
            state.show = true;
        },
        hide(state) {
            state.show = false;
        },
        setContent(state, action: PayloadAction<React.ReactNode | React.ReactNode[]>) {
            state.content = action.payload;
        }
    }
});

export const optionsReducer = popupSlice.reducer;
export const { show, hide, setContent } = popupSlice.actions;
export default popupSlice;
