import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../../layouts/AuthLayout';
import PageLayout from '../../layouts/PageLayout';
import UserSidebarLayout from '../../layouts/UserSidebarLayout';
import AllProducts from '../../pages/AllProducts';
import Cart from '../../pages/Cart';
import Product from '../../pages/Product';
import ProductsByCategory from '../../pages/ProductsByCategory';
import RegisterSuccess from '../../pages/RegisterSuccess';
import UserAccount from '../../pages/UserAccount';
import UserAddress from '../../pages/UserAddress';
import Login from '../Login';
import Logout from '../Logout';
import Register from '../Register';
import ColumnContainer from '../ui/ColumnContainer';
import Header from '../ui/Header';

const AppContainer = styled(ColumnContainer)`
    min-height: 100vh;
`;

const UserApp = () => {
    return (
        <AppContainer>
            <Header></Header>
            <Routes>
                <Route path="cart" element={<Cart />} />
                <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
                <Route path="user" element={<UserSidebarLayout />}>
                    <Route index element={<UserAddress />} />
                    <Route path="address" element={<UserAddress />} />
                    <Route path="account" element={<UserAccount />} />
                </Route>
                <Route path="category/:id" element={<ProductsByCategory />} />
                <Route path="products" >
                    <Route path="all" element={<AllProducts />} />
                    <Route path=':id' element={<Product />} />
                </Route>
                <Route path="register/success" element={<RegisterSuccess />} />
            </Routes>
        </AppContainer>
    );
};

export default UserApp;
