import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, SudokuState, UpdateCellPayload } from '../../utils/interfaces';
import { calculateCellState, initializeSudoku, isCellCorrect, loadSudoku } from '../../utils/sudokuHelper';

const initialState: SudokuState = {
    board: loadSudoku(),
    selectedCell: null,
    // board: initializeSudoku(),
};

const sudokuSlice = createSlice({
    name: 'sudoku',
    initialState,
    reducers: {
        updateCell(state, action: PayloadAction<UpdateCellPayload>) {
            const cell = action.payload.cell;
            const value = action.payload.value;
            state.board[cell.row][cell.index].value = value;

            state.board = state.board.map((row: any) => {
                return row.map((cellData: Cell) => ({
                    ...cellData,
                    isSelected: cellData.id === cell.id ? true : false,
                    isInline: calculateCellState(cell, cellData, state.board),
                }));
            });
        },
        setSelectedCell(state, action: PayloadAction<Cell | null>) {
            if (action.payload !== null) {
                const cell: Cell = action.payload;
                state.selectedCell = cell;
                state.board = state.board.map((row: any) => {
                    return row.map((cellData: Cell) => ({
                        ...cellData,
                        isSelected: cellData.id === cell.id ? true : false,
                        isInline: calculateCellState(cell, cellData, state.board),
                    }));
                });
            } else {
                state.selectedCell = null;
                state.board = state.board.map((row: any) => {
                    return row.map((cellData: Cell) => ({
                        ...cellData,
                        isSelected: false,
                        isInline: false,
                    }));
                });
            }
        },
    },
});

export const { updateCell, setSelectedCell } = sudokuSlice.actions;
export default sudokuSlice.reducer;
