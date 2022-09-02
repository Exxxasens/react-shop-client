import { useGetCategoriesQuery } from "../../api/categoriesApi";
import { Card } from "../ui/Card";
import styled from 'styled-components';
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import ColumnContainer from "../ui/ColumnContainer";
import InputLabel from "../ui/InputLabel";

interface CategoriesNavigationFilterProps {
    category: ICategory;
}
// data.filter(item => {
//    return item.parent === category._id || category.parent === item._id
// })

const CategoryButton = styled(Button)`
    padding: 0.5rem 1rem;
    white-space: nowrap;
    width: 100%;
    min-width: 128px;
`;

const CategoryLink = ({ category }: { category: ICategory }) => {
    return <Link to={"/category/" + category._id}>
        <CategoryButton>{category.title}</CategoryButton>
    </Link>
}

const CategoriesNavigationFilter = ({ category }: CategoriesNavigationFilterProps) => {
    const { data, isLoading } = useGetCategoriesQuery();

    const parents = data?.filter(item => category.parent === item._id);
    const children = data?.filter(item => item.parent === category._id);

    return <Card style={{ height: 'fit-content', display: "flex", flexDirection: "column", gap: "0.5rem", padding: '1rem' }}>
        <InputLabel>
            Категории
        </InputLabel>
        {parents && parents.length > 0 && <ColumnContainer>
            {parents.map(item => <CategoryLink category={item} />)}
        </ColumnContainer>
        }
        <ColumnContainer style={parents && parents.length ? { marginLeft: "1rem", gap: '0.5rem' } : { gap: '0.5rem' }}>
            <CategoryButton disabled variant="dark" >
                {category.title}
            </CategoryButton>
            {children && children.length > 0 && <ColumnContainer style={{ gap: '0.5rem', marginLeft: "1rem" }}>
                {children.map(item => <CategoryLink category={item} />)}
            </ColumnContainer>}
        </ColumnContainer>
    </Card>
}

export default CategoriesNavigationFilter;