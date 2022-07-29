import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContextMenuState {
    content: IMenuItem[];
    position: MenuPosition;
    show: boolean;
}

const initialState: ContextMenuState = {
    content: [],
    position: {
        x: 0,
        y: 0
    },
    show: false
};

interface MenuPosition {
    x: number;
    y: number;
}

const contextMenuSlice = createSlice({
    name: 'contextMenu',
    initialState,
    reducers: {
        setContextMenu(state, action: PayloadAction<IMenuItem[]>) {
            state.content = action.payload;
        },
        showContextMenu(state) {
            state.show = true;
        },
        hideContextMenu(state) {
            state.show = false;
        },
        setPosition(state, action: PayloadAction<MenuPosition>) {
            const { x, y } = action.payload;
            state.position = {
                x,
                y
            };
        }
    }
});

export const contextMenuReducer = contextMenuSlice.reducer;
export const { setContextMenu, showContextMenu, hideContextMenu, setPosition } =
    contextMenuSlice.actions;
export default contextMenuSlice;
