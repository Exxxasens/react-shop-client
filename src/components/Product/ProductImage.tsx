import styled from 'styled-components';
import IMAGE_PLACEHOLDER from '../../static/image_placeholder.png';

const Image = styled.img`
    height: 64px;
    width: 64px;
    background: var(--border-color);
    border-radius: 4px;
    object-fit: cover;
`;

interface ProductImageProps extends React.ComponentProps<typeof Image> {
    src: string;
}

const ProductImage = ({ src, ...rest }: ProductImageProps) => {
    return <Image src={src ? `/api/images/${src}` : IMAGE_PLACEHOLDER} {...rest} />;
};

export default ProductImage;
