import React from 'react';
import { useForm } from 'react-hook-form';
import ColumnContainer from '../ui/ColumnContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import InputContainer from '../ui/InputContainer';
import InputLabel from '../ui/InputLabel';
import Input from '../ui/Input';
import { useCreatePropertyMutation } from '../../api/propertiesApi';
import Message from '../ui/Message';
import InputError from '../ui/InputError';
import * as zod from 'zod';
import Button from '../ui/Button';
import InputDescription from '../ui/InputDescription';
import withLoading from '../hoc/withLoading';
import withProperties from '../hoc/withProperties';

const propertySchema = zod.object({
    inputName: zod.string().min(1, 'Поле обязательное для заполнения'),
    inputValue: zod.string().min(1, 'Поле обязательное для заполнения'),
    name: zod.string(),
    value: zod.string()
});

type PropertySchema = zod.infer<typeof propertySchema>;

const resolver = zodResolver(propertySchema);

interface CreateProductOptionProps {
    onSelect: (property: IProperty) => void;
    properties: IProperty[];
}

enum FormType {
    Create = 'CREATE',
    Find = 'FIND'
}

const PropertySelect: React.FC<CreateProductOptionProps> = ({ onSelect, properties }) => {
    const [createProperty, { isLoading }] = useCreatePropertyMutation();
    const [nameFormType, setNameFormType] = React.useState<FormType>(
        properties[0] ? FormType.Find : FormType.Create
    );
    const [valueFormType, setValueFormType] = React.useState<FormType>(
        properties[0] ? FormType.Find : FormType.Create
    );
    const [currentName, setCurrentName] = React.useState<string>(properties[0]?.name);
    const [message, setMessage] = React.useState<IMessage>();
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            name: properties[0]?.name || FormType.Create,
            value: properties[0]?.value || FormType.Create,
            inputName: properties[0]?.name || '',
            inputValue: properties[0]?.value || ''
        },
        resolver
    });

    function onSubmit(data: PropertySchema) {
        if (nameFormType === FormType.Create || valueFormType === FormType.Create) {
            let name = data.inputName,
                value = data.inputValue;

            createProperty({ name, value })
                .unwrap()
                .then((property) => {
                    onSelect(property);
                    setMessage({ type: 'success', text: 'Опция успешно добавлена' });
                })
                .catch((error) => {
                    if (error.data && error.data.message) {
                        return setMessage({ type: 'error', text: error.data.message });
                    }
                    setMessage({ type: 'error', text: 'Произошла неизвестная ошибка' });
                });
        } else {
            const property = properties.find(
                (item) => item.value === data.value && item.name === data.name
            );
            if (property) {
                onSelect(property);
            }
        }
    }

    function mapNames() {
        const set = new Set<string>();
        properties.forEach((property) => set.add(property.name));

        return Array.from(set).map((setValue, i) => {
            return (
                <option value={setValue} key={setValue}>
                    {setValue}
                </option>
            );
        });
    }

    function mapValues() {
        return properties
            .filter((property) => property.name === currentName || nameFormType === FormType.Create)
            .map((property, i) => {
                const isSelected = i === 0;
                return (
                    <option value={property.value} key={property._id} selected={isSelected}>
                        {property.value}
                    </option>
                );
            });
    }

    function onNameChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setValue('inputName', e.target.value);
        setCurrentName(e.target.value);
        if (e.target.value === FormType.Create) {
            setValue('inputName', '');
            return setNameFormType(FormType.Create);
        }

        if (nameFormType === FormType.Create) {
            setNameFormType(FormType.Find);
        }

        if (valueFormType === FormType.Create) {
            setValueFormType(FormType.Find);
        }
    }

    function onValueChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setValue('inputValue', e.target.value);
        if (e.target.value === FormType.Create) {
            setValue('inputValue', '');
            return setValueFormType(FormType.Create);
        }

        if (valueFormType === FormType.Create) {
            setValueFormType(FormType.Find);
        }
    }

    if (!properties) {
        return <div>loading...</div>;
    }

    return (
        <ColumnContainer as="form" onSubmit={handleSubmit(onSubmit)} style={{ gap: '1rem' }}>
            <InputContainer>
                <InputLabel>Название опции:</InputLabel>
                <InputDescription>Выберите название из списка или добавьте новое</InputDescription>
                <ColumnContainer style={{ gap: '1rem' }}>
                    <Input
                        {...register('name', { onChange: onNameChange })}
                        as="select"
                        placeholder="Выберите из списка"
                    >
                        {properties.length > 0 && mapNames()}
                        {properties.length === 0 && (
                            <>
                                <option value="" disabled selected>
                                    Нет доступных опций
                                </option>
                            </>
                        )}
                        <option value={FormType.Create}>Добавить новую опцию</option>
                    </Input>
                    {nameFormType === FormType.Create && (
                        <Input
                            placeholder="Название"
                            {...register('inputName')}
                            style={{
                                borderTopLeftRadius: '1rem',
                                borderBottomLeftRadius: '1rem'
                            }}
                        />
                    )}
                    {nameFormType === FormType.Create && errors.inputName && (
                        <InputError type="error">{errors.inputName.message}</InputError>
                    )}
                </ColumnContainer>
            </InputContainer>
            <InputContainer>
                <InputLabel>Значение опции</InputLabel>
                <InputDescription>Выберите значение из списка или добавьте новое</InputDescription>
                <ColumnContainer style={{ gap: '1rem' }}>
                    <Input as="select" {...register('value', { onChange: onValueChange })}>
                        {mapValues()}
                        <option value={FormType.Create}>Добавить новое значение</option>
                    </Input>
                    {valueFormType === FormType.Create && (
                        <Input
                            placeholder="Название"
                            {...register('inputValue')}
                            style={{
                                borderTopLeftRadius: '1rem',
                                borderBottomLeftRadius: '1rem'
                            }}
                        />
                    )}
                    {valueFormType === FormType.Create && errors.inputValue && (
                        <InputError type="error">{errors.inputValue.message}</InputError>
                    )}
                </ColumnContainer>
            </InputContainer>

            {message && <Message type={message.type}>{message.text}</Message>}

            <Button disabled={isLoading} variant="dark" type="submit">
                Добавить
            </Button>
        </ColumnContainer>
    );
};

export default withProperties(withLoading(PropertySelect, () => <div>Loading...</div>));
