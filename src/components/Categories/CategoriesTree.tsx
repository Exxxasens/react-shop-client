import React from 'react';
import styled from 'styled-components';
import { IoAdd, IoClose, IoSettingsSharp, IoPencilSharp, IoTrashOutline } from 'react-icons/io5';
import RowContainer from '../ui/RowContainer';
import ColumnContainer from '../ui/ColumnContainer';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { setContextMenu, setPosition, showContextMenu } from '../../store/slices/contextMenuSlice';

interface ItemWrapperProps {
    margin?: string;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
    margin-left: 2rem;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 2rem;
`;

interface ItemProps {
    active: boolean;
}

const Item = styled.div<ItemProps>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    background: var(--text-color);
    color: var(--primary-light-color);
    border-radius: 0.75rem;
    justify-content: space-between;
    box-shadow: var(--card-shadow);
    font-size: 0.85rem;

    ${(props) =>
        props.active &&
        `
        background: var(--primary-color);
        box-shadow: var(--primary-shadow);
        color: white;
    `}
`;

const ControlWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
`;

const ItemControl = styled.button`
    all: unset;
    // background-color: white;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    margin-left: 0.25rem;
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: var(--primary-color);
        color: var(--primary-light-color);
    }
`;

const Title = styled.h3`
    margin: 0;
    padding: 0;
    font-weight: 400;
`;

interface TreeNodeProps {
    item: ICategoryTreeItem;
    editable?: boolean;
    //    onContextMenu?: () => any;
}

const TreeNode: React.FC<TreeNodeProps> = ({ item, editable = false }) => {
    const [isShowSub, setShowSub] = React.useState(true);
    const [isActive, setActive] = React.useState(false);
    const toggleShow = () => setShowSub((s) => !s);
    // const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const dispatch = useAppDispatch();
    const { show } = useAppSelector((state) => state.contextMenu);

    const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        if (show) return null;
        const { pageX, pageY } = e;
        const contextMenuItems = [
            {
                title: 'Создать подкатегорию',
                icon: <IoAdd />,
                handler: () => {
                    // popupStore.setContent(<CategoriesForm parent={item._id} />);
                    setShowSub(true);
                }
            },
            {
                title: 'Редактировать',
                icon: <IoPencilSharp />,
                handler: () => {
                    // inputRef.current && inputRef.current.focus();
                }
            },
            {},
            {
                title: 'Удалить',
                className: 'delete',
                icon: <IoTrashOutline />,
                handler: () => {}
            }
        ];
        dispatch(setContextMenu(contextMenuItems));
        dispatch(setPosition({ x: pageX, y: pageY }));
        dispatch(showContextMenu());
        setActive(true);
    };

    React.useEffect(() => {
        if (!show) {
            setActive(false);
        }
    }, [show]);

    return (
        <>
            <Item active={isActive}>
                <RowContainer>
                    <Title>{item.title}</Title>
                </RowContainer>
                <ControlWrapper>
                    {editable && (
                        <ItemControl onClick={onContextMenu}>
                            <IoSettingsSharp />
                        </ItemControl>
                    )}
                    <ItemControl onClick={toggleShow}>
                        {isShowSub ? <IoClose /> : <IoAdd />}
                    </ItemControl>
                </ControlWrapper>
            </Item>

            {item.children.length > 0 && isShowSub && (
                <ItemWrapper>
                    {item.children.map((item) => {
                        return <TreeNode item={item} editable={editable} key={item._id} />;
                    })}
                </ItemWrapper>
            )}
        </>
    );
};

interface CategoryProps {
    editable?: boolean;
    categories: ICategoryTreeItem[]; // TODO: CHANGE
}

const CategoriesTree: React.FC<CategoryProps> = ({ editable = false, categories }) => {
    return (
        <RowContainer>
            <ColumnContainer style={{ width: '100%' }}>
                {categories.map((item) => (
                    <TreeNode item={item} editable={editable} key={item._id} />
                ))}
            </ColumnContainer>
        </RowContainer>
    );
};

export default CategoriesTree;
