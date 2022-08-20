import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserApp from './UserApp';
import AdminApp from './AdminApp';
import Popup from '../Popup';
import { store } from '../../store';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/admin/*" element={<AdminApp />} />
                    <Route path="/*" element={<UserApp />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
