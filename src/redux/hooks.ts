// Importing necessary hooks from react-redux
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

// Importing types for AppDispatch and RootState from the store
import { AppDispatch, RootState } from './store';

// Defining a type for the dispatch function, which returns AppDispatch
type DispatchFuntion = () => AppDispatch;

// Creating a custom hook for dispatch with proper typing
export const useAppDispatch: DispatchFuntion = useDispatch;

// Creating a custom hook for selector with the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
