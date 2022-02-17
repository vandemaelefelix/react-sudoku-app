import { combineReducers } from 'redux';

import sudokuReducer from './Sudoku/sudoku.reducer';

const rootReducer = combineReducers({
    sudoku: sudokuReducer,
});

export default rootReducer;
