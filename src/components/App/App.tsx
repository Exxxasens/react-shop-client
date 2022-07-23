import React from 'react';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import Header from '../ui/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import PageLayout from '../../layouts/PageLayout';
import AuthLayout from '../../layouts/AuthLayout';
import UserSidebarLayout from '../../layouts/UserSidebarLayout';
import UserAddress from '../../pages/UserAddress';

const AppContainer = styled(ColumnContainer)`
    min-height: 100vh;
`;

const App = () => {
    return (
        <BrowserRouter>
            <AppContainer>
                <Header></Header>
                <Routes>
                    <Route
                        path="cart"
                        element={<PageLayout title="Корзина" />}
                    />
                    <Route path="auth" element={<AuthLayout />}>
                        <Route index element={<Navigate to="login" />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="user" element={<UserSidebarLayout />}>
                        <Route index element={<UserAddress />} />
                        <Route path="address" element={<UserAddress />} />
                    </Route>
                </Routes>
            </AppContainer>
        </BrowserRouter>
    );
};

export default App;
