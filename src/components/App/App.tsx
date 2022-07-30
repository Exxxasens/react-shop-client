import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserApp from './UserApp';
import AdminApp from './AdminApp';
import { store } from '../../store';
import Popup from '../Popup';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Popup />
                <Routes>
                    <Route path="/admin/*" element={<AdminApp />} />
                    <Route path="/*" element={<UserApp />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
