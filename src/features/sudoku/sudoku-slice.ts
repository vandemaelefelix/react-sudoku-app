import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, Settings, SudokuState, UpdateCellPayload, UpdateNotesPayload } from '../../utils/interfaces';
import { calculateCellState, loadSudoku } from '../../utils/sudokuHelper';

const getSettings = (): Settings => {
    console.log('Setting Settings');
    const settingsString: string | null = localStorage.getItem('settings');
    let settings: Settings;
    if (settingsString) {
        settings = JSON.parse(settingsString);
    } else {
        settings = {
            guides: true,
            showMistakes: true,
            highlightSameNumbers: true,
        };
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    return settings;
};

const setSettings = (newSettings: Settings) => {
    console.log('Updating Settings');

    const oldSettings = getSettings();

    let settings = {
        ...oldSettings,
        ...newSettings,
    };

    localStorage.setItem('settings', JSON.stringify(settings));

    return settings;
};

const initialState: SudokuState = {
    board: loadSudoku(),
    selectedCell: null,
    isEditNotes: false,
    settings: getSettings(),
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
                    isSameAsSelected:
                        cell.id !== cellData.id &&
                        cell.value !== null &&
                        cell.value === cellData.value &&
                        state.settings.highlightSameNumbers
                            ? true
                            : false,
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
                        isSameAsSelected:
                            cell.id !== cellData.id &&
                            cell.value !== null &&
                            cell.value === cellData.value &&
                            state.settings.highlightSameNumbers
                                ? true
                                : false,
                    }));
                });
            } else {
                state.selectedCell = null;
                state.board = state.board.map((row: any) => {
                    return row.map((cellData: Cell) => ({
                        ...cellData,
                        isSelected: false,
                        isInline: false,
                        isSameAsSelected: false,
                    }));
                });
            }
        },
        toggleEditNotes(state) {
            state.isEditNotes = !state.isEditNotes;
        },
        updateSettings(state, action: PayloadAction<Settings>) {
            state.settings = setSettings(action.payload);
            setSelectedCell(state.selectedCell);
        },
    },
});

export const { updateCell, setSelectedCell, toggleEditNotes, updateCellNotes, updateSettings } = sudokuSlice.actions;
export default sudokuSlice.reducer;
