import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers';

// Creating the Redux store by configuring it with the root reducer
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Configuring persistence for the Redux store to persist data across sessions
const persistor = persistStore(store); // Persisting the store's state

// Type representing the root state of the Redux store
export type RootState = ReturnType<typeof store.getState>; // Type inference for the state based on the store's getState method

// Type representing the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch; // Type inference for dispatch based on the store's dispatch method

// Exporting the store and persistor for use in the application
export { persistor, store };
