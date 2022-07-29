import RowContainer from '../components/ui/RowContainer';
import Button from '../components/ui/Button';
import PageLayout from './PageLayout';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface ProductLayoutProps extends React.ComponentProps<typeof PageLayout> {}

const LinkButton = styled(Button)`
    background: var(--text-color);
    color: var(--primary-light-color) !important;
    padding: 0.75rem 1.5rem;
`;

const ProductLayout = ({ ...rest }: ProductLayoutProps) => {
    return (
        <PageLayout {...rest}>
            <RowContainer style={{ marginBottom: '2rem' }}>
                <NavLink to="create">
                    {({ isActive }) => (
                        <LinkButton variant={isActive ? 'active' : undefined}>Создать</LinkButton>
                    )}
                </NavLink>
            </RowContainer>
        </PageLayout>
    );
};

export default ProductLayout;
