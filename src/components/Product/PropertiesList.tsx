import { FiX } from 'react-icons/fi';
import styled from 'styled-components';
import ColumnContainer from '../ui/ColumnContainer';
import Message from '../ui/Message';
import RowContainer from '../ui/RowContainer';

const PropertyRow = styled(RowContainer)`
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    align-items: center;
`;

const Name = styled.div`
    width: 100%;
    position: relative;
    padding: 0.25rem 0;
    &::after {
        border-bottom: 2px dotted var(--background-color);
        bottom: 0.2em;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        width: 100%;
    }
`;

const Value = styled.div`
    font-weight: normal;
`;

const PropertiesContainer = styled(ColumnContainer)`
    border-radius: 0.5rem;
`;

interface PropertiesListProps {
    properties: IProperty[];
    onRemove?: (prop: IProperty) => void;
}

const PropertiesList = ({ properties, onRemove }: PropertiesListProps) => {
    return (
        <PropertiesContainer>
            {properties.map((item) => (
                <PropertyItem property={item} onRemove={onRemove} />
            ))}
            {properties.length === 0 && (
                <RowContainer>
                    <Message style={{ fontWeight: 'bold' }} type="info">
                        Нет свойств
                    </Message>
                </RowContainer>
            )}
        </PropertiesContainer>
    );
};

interface PropertyItemProps {
    property: IProperty;
    onRemove?: (prop: IProperty) => void;
}

const RemoveButton = styled.div`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--text-color);
    margin-left: 1rem;
    &:hover {
        color: var(--error-color);
        text-decoration: underline;
    }
`;

const PropertyItem = ({ property, onRemove }: PropertyItemProps) => {
    return (
        <PropertyRow key={property._id}>
            <Name style={{ marginRight: '0.5rem' }}>{property.name}</Name>
            <Value>{property.value}</Value>
            {onRemove && (
                <RemoveButton onClick={() => onRemove(property)}>
                    <FiX />
                </RemoveButton>
            )}
        </PropertyRow>
    );
};

export default PropertiesList;
