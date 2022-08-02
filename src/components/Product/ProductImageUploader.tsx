import React from 'react';
import { useAddProductImageMutation, useRemoveProductImageMutation } from '../../api/productsApi';
import { useAddAddressMutation } from '../../api/userApi';
import ImagePreview from '../Image/ImagePreview';
import ImageUploader from '../Image/ImageUploader';
import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';
import LoadingGif from '../../static/Eclipse-1s-200px.gif';

interface ProductImageUploaderProps {
    product: IProduct;
}

const ProductImageUploader = (props: ProductImageUploaderProps) => {
    const [images, setImages] = React.useState(props.product.images);
    const [uploadingImages, setUploadingImages] = React.useState<File[]>([]);
    const [message, setMessage] = React.useState('');
    const [removeImage] = useRemoveProductImageMutation();
    const [addImage] = useAddProductImageMutation();

    const onImageRemove = (id: string) => {
        setImages((img) => img.filter((item) => item !== id));
        removeImage({ imageId: id, productId: props.product._id })
            .unwrap()
            .catch((error) => {
                console.log(error);
                setMessage(error.message || 'Произошла ошибка');
            });
    };

    const onImageUpload = (file: File) => {
        setUploadingImages((imgs) => [...imgs, file]);
        addImage({ id: props.product._id, image: file })
            .unwrap()
            .then(({ filename }) => {
                setImages((imgs) => [...imgs, filename]);
                setUploadingImages((imgs) => imgs.filter((img) => img !== file));
            })
            .catch((error) => {
                setMessage(error.message || 'Произошла ошибка');
            });
    };

    return (
        <ColumnContainer>
            <ImageUploader onUpload={onImageUpload}>
                {images.map((img) => (
                    <ImagePreview
                        image={`/api/images/${img}`}
                        onRemove={() => onImageRemove(img)}
                        key={img}
                    />
                ))}
                {uploadingImages.length >= 0 &&
                    uploadingImages.map((img) => (
                        <ImagePreview image={LoadingGif} key={img.name} />
                    ))}
            </ImageUploader>
            {message && <Message type="error">{message}</Message>}
        </ColumnContainer>
    );
};

export default ProductImageUploader;
