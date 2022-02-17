import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, SudokuState, UpdateCellPayload, UpdateNotesPayload } from '../../utils/interfaces';
import { calculateCellState, loadSudoku } from '../../utils/sudokuHelper';

const initialState: SudokuState = {
    board: loadSudoku(),
    selectedCell: null,
    isEditNotes: false,

    settings: {
        guides: true,
        showMistakes: true,
        highlightSameNumbers: true,
    },
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
                    isInline: state.settings.guides ? calculateCellState(cell, cellData, state.board) : false,
                }));
            });
        },
        updateCellNotes(state, action: PayloadAction<UpdateNotesPayload>) {
            const cell = action.payload.cell;
            const note = action.payload.note;
            const notes = state.board[cell.row][cell.index].notes;

            if (note !== null) {
                if (notes.includes(note)) {
                    notes.splice(notes.indexOf(note), 1);
                } else {
                    notes.push(note);
                }
            } else {
                notes.length = 0;
            }
        },
        setSelectedCell(state, action: PayloadAction<Cell | null>) {
            if (action.payload !== null) {
                const cell: Cell = action.payload;
                state.selectedCell = cell;
                state.board = state.board.map((row: any) => {
                    return row.map((cellData: Cell) => ({
                        ...cellData,
                        isSelected: cellData.id === cell.id ? true : false,
                        isInline: state.settings.guides ? calculateCellState(cell, cellData, state.board) : false,
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
        toggleEditNotes(state) {
            state.isEditNotes = !state.isEditNotes;
        },
    },
});

export const { updateCell, setSelectedCell, toggleEditNotes, updateCellNotes } = sudokuSlice.actions;
export default sudokuSlice.reducer;
