import React from 'react';
import styled from 'styled-components';

export const TableWrapper = styled.table`
    display: table;
    border-radius: 0.5rem;

    border-collapse: collapse;
`;

export const Row = styled.tr`
    display: table-row;
    border-collapse: collapse;
    border-bottom: 1px solid rgb(237, 237, 237);
`;

export const Cell = styled.td`
    display: table-cell;
    padding: 1rem 1rem;
    vertical-align: middle;
    border-collapse: collapse;
    color: #566a7f;
`;

export const TableHeader = styled.tr`
    display: table-row;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 1px solid rgb(237, 237, 237);
    ${Cell} {
        padding: 0.75rem 1rem;
    }
`;

interface TableProps extends React.ComponentProps<typeof TableWrapper> {
    children?: React.ReactNode | React.ReactNode[];
}

const Table: React.FC<TableProps> = ({ children = null, ...rest }) => {
    return <TableWrapper {...rest}>{children}</TableWrapper>;
};

export default Table;
