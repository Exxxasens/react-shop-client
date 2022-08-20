import React from 'react';
import styled from 'styled-components';
import { IoAdd, IoClose, IoSettingsSharp, IoPencilSharp, IoTrashOutline } from 'react-icons/io5';
import RowContainer from '../ui/RowContainer';
import ColumnContainer from '../ui/ColumnContainer';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import {
    hideContextMenu,
    setContextMenu,
    setPosition,
    showContextMenu
} from '../../store/slices/contextMenuSlice';
import { useRemoveCategoryMutation, useUpdateCategoryMutation } from '../../api/categoriesApi';
import { useSearchParams } from 'react-router-dom';

interface ItemWrapperProps {
    margin?: string;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 2rem;
    gap: 0.75rem;
`;

interface ItemProps {
    active: boolean;
    isDisabled?: boolean;
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

    transition: all 0.125s;

    ${(props) =>
        props.active &&
        `
        background: var(--primary-color);
        box-shadow: var(--primary-shadow);
        color: var(--primary-light-color);
    `}

    ${(props) =>
        props.isDisabled &&
        `
        background: var(--background-color);
        color: var(--text-color);
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
    color: var(--primary-light-color);
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

const TitleInput = styled.input`
    all: unset;
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
    const [isEditable, setEditable] = React.useState(false);
    const [titleValue, setTitleValue] = React.useState(item.title);

    const toggleShow = () => setShowSub((s) => !s);
    const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const dispatch = useAppDispatch();
    const { show } = useAppSelector((state) => state.contextMenu);
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [removeCategories] = useRemoveCategoryMutation();
    const [searchParams, setSearchParams] = useSearchParams();

    const contextMenuItems = [
        {
            title: 'Создать подкатегорию',
            icon: <IoAdd />,
            handler: () => {
                setSearchParams({ parent: item._id, create: 'true' }, { replace: false });
                setShowSub(true);
                dispatch(hideContextMenu());
            }
        },
        {
            title: 'Редактировать',
            icon: <IoPencilSharp />,
            handler: () => {
                inputRef.current && inputRef.current.focus();
                setEditable(true);
                dispatch(hideContextMenu());
            }
        },
        {},
        {
            title: 'Удалить',
            className: 'delete',
            icon: <IoTrashOutline />,
            handler: () => {
                removeCategories(item._id);
                dispatch(hideContextMenu());
            }
        }
    ];

    const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        if (show) return null;
        const { pageX, pageY } = e;
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

    const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isEditable) {
            setTitleValue(value);
        }
    };

    const onBlur = () => {
        if (isEditable) {
            setEditable(false);
            if (item.title === titleValue) {
                return null;
            }
            const update: ICategory = {
                _id: item._id,
                parent: item.parent,
                title: titleValue
            };
            updateCategory(update);
        }
    };

    return (
        <>
            <Item active={isActive} isDisabled={isUpdating}>
                <RowContainer>
                    <TitleInput
                        value={titleValue}
                        onChange={onEdit}
                        onBlur={onBlur}
                        ref={inputRef}
                    />
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
            <ColumnContainer style={{ width: '100%', gap: "0.75rem" }}>
                {categories.map((item) => (
                    <TreeNode item={item} editable={editable} key={item._id} />
                ))}
            </ColumnContainer>
        </RowContainer>
    );
};

export default CategoriesTree;
