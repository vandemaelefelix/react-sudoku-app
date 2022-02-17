import { configureStore } from '@reduxjs/toolkit';
import sudokuReducer from '../features/sudoku/sudoku-slice';

export const store = configureStore({
    reducer: {
        sudoku: sudokuReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
