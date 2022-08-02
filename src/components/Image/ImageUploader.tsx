import React, { PropsWithChildren } from 'react';
import { FiPlus } from 'react-icons/fi';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import RowContainer from '../ui/RowContainer';
import ImagePreview from './ImagePreview';

const ImageInputWrapper = styled.label`
    position: relative;
    justify-content: center;
    align-items: center;
    display: flex !important;
    height: 200px;
    height: 200px;
    text-align: center;
`;

const ImageInputLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    content: '';
    background: var(--background-color);
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.85rem;
    top: 0;
    left: 0;
    cursor: pointer;
    &:hover {
        color: var(--primary-color);
    }
`;

interface ImageUploaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onUpload: (file: File) => void;
}

const ImageUploader = ({
    onChange,
    children,
    onUpload,
    ...rest
}: PropsWithChildren<ImageUploaderProps>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);

        const files = e.target.files;
        if (!files) return;

        const imageArray: File[] = [];
        for (let index = 0; index < files.length; index++) {
            const image = files.item(index);
            if (image) {
                imageArray.push(image);
                onUpload(image);
            }
        }
    };

    return (
        <ColumnContainer style={{ overflow: 'auto' }}>
            <RowContainer style={{ gap: '1rem', margin: '0.5rem 0' }}>
                <ImageInputWrapper>
                    <input
                        {...rest}
                        type="file"
                        onChange={handleChange}
                        accept="image/png, image/jpg, image/jpeg"
                        style={{ opacity: 0 }}
                        multiple
                    />
                    <ImageInputLabel>
                        <RowContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FiPlus style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
                            <div>Добавить изображение</div>
                        </RowContainer>
                    </ImageInputLabel>
                </ImageInputWrapper>
                <RowContainer style={{ gap: '1rem' }}>{children}</RowContainer>
            </RowContainer>
        </ColumnContainer>
    );
};

export default ImageUploader;
