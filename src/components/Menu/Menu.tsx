import React from "react";
import ContentLoader from "react-content-loader";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import { boolean } from "zod";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import { Card } from "../ui/Card";
import ColumnContainer from "../ui/ColumnContainer";
import LinkButton, { StyledLinkButton } from "../ui/LinkButton";
import RowContainer from "../ui/RowContainer";


interface MenuItemLinkProps {
    active?: boolean;
}
const MenuItemLink = styled(LinkButton) <MenuItemLinkProps>`
    gap: 0.5rem;
    cursor: pointer;
    width: max-content;
    ${StyledLinkButton} {
        color: var(--text-color);
        background: none;
        &:hover, &:focus {
            box-shadow: var(--primary-shadow);
        }
    }
    ${props => props.active && `
        ${StyledLinkButton} {
            color: var(--primary-light-color);
            background: var(--primary-color);
            box-shadow: var(--primary-shadow);
        }
    `}
`;

const MenuLinkSecondary = styled.button`
    all: unset;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;

    font-size: 0.85rem;
    font-weight: bold;

    &:active,
    &:hover {
        color: var(--text-color);
        background: var(--background-color);
        box-shadow: var(--card-shadow);
    }
`

const Delimiter = styled.div`
    min-height: 100%;
    width: 1px;
    margin: 0 0.5rem;
    background: var(--background-color);
`;

const Menu = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    const [primaryCategory, setPrimaryCategory] = React.useState<ICategory | null>(null);

    return <Card style={{ position: "absolute", top: "100%", marginTop: "1rem", padding: "0.75rem" }}>
        <RowContainer>
            <ColumnContainer style={{ gap: "0.5rem" }}>
                {isLoading &&
                    (new Array(5).fill(null)).map(() => <ContentLoader
                        width={150}
                        height={40}
                        backgroundColor="#f1f2f3"
                        foregroundColor="#ebf0fe"
                    >
                        <rect x="0" y="0" rx="12px" ry="12" width="100%" height="100%" />
                    </ContentLoader>)
                }
                {data && data.filter(item => !item.parent).map(item => <MenuItemLink to={`/category/${item._id}`} onMouseEnter={() => setPrimaryCategory(item)} active={primaryCategory?._id === item._id} >
                    <RowContainer style={{ gap: '0.5rem' }} >
                        <RowContainer>{item.title}</RowContainer>
                        <RowContainer>-{">"}</RowContainer>
                    </RowContainer>
                </MenuItemLink>)}
            </ColumnContainer>
            {primaryCategory && data && <>
                <Delimiter />
                <ColumnContainer>
                    {data.filter(item => item.parent == primaryCategory._id).map(item => <Link to={`/category/${item._id}`}>
                        <ColumnContainer><MenuLinkSecondary>{item.title}</MenuLinkSecondary></ColumnContainer>
                    </Link>)}
                </ColumnContainer>
            </>}
        </RowContainer>
    </Card>
}

export default Menu;
