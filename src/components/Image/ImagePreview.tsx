import { FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';

const PreviewImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 200px;
`;

const ImageWithControlWrapper = styled.div`
    position: relative;
    height: 200px;
    display: flex;
    background: rgb(241, 242, 245);
    border-radius: 0.5rem;
`;

const PreviewImage = styled.img`
    border-radius: 0.5rem;
    // background: rgb(241, 242, 245);
    border-radius: 0.5rem;
    height: 100%;
`;

const DeleteImageBtn = styled.div`
    position: absolute;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: white;
    font-size: 2rem;
    top: 0;
    left: 0;
    &:hover {
        background: rgba(0, 0, 0, 0.25);
        opacity: 1;
        cursor: pointer;
        border-radius: 0.5rem;
    }
`;

interface ImagePreviewProps<T> {
    image: T;
    onRemove?: (image: T) => void;
}
const ImagePreview = <T extends File | string>({
    image,
    onRemove = () => null
}: ImagePreviewProps<T>) => {
    const imageSource = image instanceof File ? URL.createObjectURL(image) : image.toString();
    return (
        <PreviewImageWrapper>
            <ImageWithControlWrapper>
                <PreviewImage src={imageSource} />
                <DeleteImageBtn onClick={() => onRemove(image)}>
                    <FiTrash2 />
                </DeleteImageBtn>
            </ImageWithControlWrapper>
        </PreviewImageWrapper>
    );
};

export default ImagePreview;
