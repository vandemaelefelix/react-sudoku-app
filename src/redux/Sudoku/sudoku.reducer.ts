import { initializeSudoku } from '../../utils/sudokuHelper';
import { UPDATE_CELL } from './sudoku.types';

const INITIAL_STATE = { sudoku: initializeSudoku(), selectedCell: 0 };

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_CELL:
            return {
                ...state,
                selectedCell: state.selectedCell + 1,
            };

        default:
            return state;
    }
};

export default reducer;
