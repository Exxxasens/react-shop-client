import CategoriesTree from '../components/Categories/CategoriesTree';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
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
    const categories: ICategory[] = [
        {
            _id: '1',
            link: 'phones',
            parent: undefined,
            title: 'Смартфоны'
        },
        {
            _id: '2',
            link: 'accessories',
            parent: '1',
            title: 'Аксессуары'
        }
    ];

    const categoriesTree = buildTree(categories);

    return (
        <ColumnContainer style={{ gap: '1rem' }}>
            <RowContainer>
                <Button variant="active">Создать новую ветку</Button>
            </RowContainer>
            <Card style={{ width: '100%', maxWidth: '600px' }}>
                <CategoriesTree categories={categoriesTree} editable={true} />
            </Card>
        </ColumnContainer>
    );
};

export default Categories;
