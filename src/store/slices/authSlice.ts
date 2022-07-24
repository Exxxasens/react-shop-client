import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';

interface AuthState {
    user: IUser | null;
    token: string | null;
}

function getToken() {
    return window.localStorage.getItem('token');
}

function setToken(token: string) {
    return window.localStorage.setItem('token', token);
}

const initialState: AuthState = {
    user: null,
    token: getToken()
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            setToken('');
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                setToken(payload.token);
            }
        );
        builder.addMatcher(
            userApi.endpoints.getUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            }
        );
    }
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authSlice;
