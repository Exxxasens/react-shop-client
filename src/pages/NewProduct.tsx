import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCreateProductMutation } from '../api/productsApi';
import { useCreatePropertyMutation } from '../api/propertiesApi';
import ColumnContainer from '../components/ui/ColumnContainer';

const NewProduct = () => {
    const [createProduct, { data, isLoading }] = useCreateProductMutation({});

    React.useEffect(() => {
        createProduct({});
    }, []);

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    const path = '../edit/' + data._id;
    return <Navigate to={path} />;
};

export default NewProduct;
