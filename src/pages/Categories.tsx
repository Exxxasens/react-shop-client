import { useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../api/categoriesApi';
import CategoriesTree from '../components/Categories/CategoriesTree';
import CreateCategory from '../components/Categories/CreateCategory';
import Popup from '../components/Popup';
import Button from '../components/ui/Button';
import { Card, CardTitle } from '../components/ui/Card';
import ColumnContainer from '../components/ui/ColumnContainer';
import RowContainer from '../components/ui/RowContainer';

const buildTree = (categories: ICategory[]) => {
    const result: ICategoryTreeItem[] = [];
    const table: { [key: string]: ICategoryTreeItem } = {};

    categories.forEach(
        (item) =>
            (table[item._id] = {
                ...item,
                children: []
            } as ICategoryTreeItem)
    );

    categories.forEach((item) => {
        if (item.parent) table[item.parent].children.push(table[item._id]);
        else result.push(table[item._id]);
    });

    return result;
};

const Categories = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    const [searchParams, setSearchParams] = useSearchParams();

    function onCreate() {
        setSearchParams({});
    }

    return (
        <ColumnContainer style={{ gap: '1rem' }}>
            {searchParams && searchParams.has('create') && (
                <Popup onClose={() => setSearchParams({})}>
                    <CardTitle style={{ width: '300px' }}>Создать категорию</CardTitle>
                    <CreateCategory parentId={searchParams.get('parent')} onCreate={onCreate} />
                </Popup>
            )}
            <RowContainer>
                <Button variant="active" onClick={() => setSearchParams({ create: 'true' })}>
                    Создать новую ветку
                </Button>
            </RowContainer>
            <Card style={{ width: '100%', maxWidth: '600px' }}>
                {isLoading && <div>Loading...</div>}
                {data && data.length > 0 && (
                    <CategoriesTree categories={buildTree(data)} editable={true} />
                )}
                {data?.length === 0 && <h2>Категории не созданы</h2>}
            </Card>
        </ColumnContainer>
    );
};

export default Categories;
