import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStore } from '../../store';

const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export default useAppSelector;
