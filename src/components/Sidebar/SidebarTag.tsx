import ColumnContainer from '../ui/ColumnContainer';
import styled from 'styled-components';

interface SidebarTagProps {
    name?: string;
}

const Tag = styled(ColumnContainer)`
    padding: 1.25rem 1rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    background: var(--background-color);
`;

const Name = styled.div`
    color: var(--primary-color);
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    //margin-top: 0.25rem;
`;

const Text = styled.div`
    font-weight: bold;
    width: 100%;
`;

const SidebarTag = ({ name }: SidebarTagProps) => {
    return (
        <Tag>
            <Text>Добро пожаловать, </Text>
            <Name>{name}</Name>
        </Tag>
    );
};

export default SidebarTag;
