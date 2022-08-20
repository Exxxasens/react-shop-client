import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ColumnContainer from '../ui/ColumnContainer';
import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import SubmitButton from '../ui/SubmitButton';
import * as zod from 'zod';
import { useCreateCategoryMutation } from '../../api/categoriesApi';
import { AuthMessage } from '../ui/AuthCard';

interface CreateCategoryProps {
    parentId?: string | null;
    onCreate?: (category: ICategory) => void;
}

const createCategorySchema = zod.object({
    label: zod.string()
});

type CreateCategorySchema = zod.infer<typeof createCategorySchema>;

const CreateCategory = ({ parentId, onCreate }: CreateCategoryProps) => {
    const [error, setError] = React.useState('');
    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            label: ''
        }
    });

    const [create, { isLoading }] = useCreateCategoryMutation();

    const onSubmit = ({ label }: CreateCategorySchema) => {
        create({ title: label, parent: parentId })
            .unwrap()
            .then((item) => {
                onCreate && onCreate(item);
            })
            .catch((error) => {
                if (error && error.data?.message) {
                    setError(error.data?.message);
                }
            });
    };

    watch(() => setError(''));

    return (
        <ColumnContainer as="form" onSubmit={handleSubmit(onSubmit)}>
            <InputLabel>Название {parentId ? 'подкатегории' : 'категории'}:</InputLabel>
            <Input
                type="text"
                placeholder={`Введите название ${parentId ? 'подкатегории' : 'категории'}`}
                {...register('label')}
            />
            {error && (
                <AuthMessage type="error" style={{ maxWidth: '300px' }}>
                    {error}
                </AuthMessage>
            )}
            <SubmitButton style={{ marginTop: '1rem' }} disabled={isLoading}>
                Создать
            </SubmitButton>
        </ColumnContainer>
    );
};

export default CreateCategory;
