import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Cell,
    GameState,
    Settings,
    SudokuState,
    UpdateCellPayload,
    UpdateGamePayload,
    UpdateNotesPayload,
} from '../../utils/interfaces';
import { calculateCellState, isCellCorrect, loadSudoku, loadSudokuArray } from '../../utils/sudokuHelper';

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
            hideImpossibleNumbers: true,
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
    // board: loadSudoku(),
    board: [],
    selectedCell: null,
    isEditNotes: false,
    settings: getSettings(),
    currentGame: null,
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
                        value !== null &&
                        value === cellData.value &&
                        state.settings.highlightSameNumbers
                            ? true
                            : false,
                    isCorrect: state.settings.showMistakes ? isCellCorrect(cellData, state.board) : true,
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
            console.log('Setting selected cell 😉');
            console.log(action.payload);
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
                        isCorrect: state.settings.showMistakes ? isCellCorrect(cellData, state.board) : true,
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

            // console.log(state.selectedCell);
        },
        toggleEditNotes(state) {
            console.log('Toggle Edit settings');
            state.isEditNotes = !state.isEditNotes;
        },
        updateSettings(state, action: PayloadAction<Settings>) {
            console.log('updating Settings!');
            state.settings = setSettings(action.payload);
            setSelectedCell(state.selectedCell);
        },

        updateGame(state, action: PayloadAction<UpdateGamePayload>) {
            console.log('Updating game!');
            const gameId = action.payload.gameId;
            const updateProperties = action.payload.updateProperties;
            try {
                const games = localStorage.getItem('games');
                let gamesList: GameState[] = games ? JSON.parse(games) : [];

                let updatedGame: GameState | undefined;

                const updatedGamesList = Object.assign(gamesList).map((game: GameState, index: number) => {
                    if (game.id === gameId) {
                        updatedGame = {
                            ...game,
                            ...updateProperties,
                        };
                        return updatedGame;
                    } else {
                        return game;
                    }
                });

                // Update game in localStorage and in state
                localStorage.setItem('games', JSON.stringify(updatedGamesList));
                if (updatedGame) {
                    state.currentGame = updatedGame;
                }
            } catch (error) {
                console.error(error);
            }
        },

        // TODO: Remove id from payload
        setupGame(state, action: PayloadAction<GameState>) {
            try {
                const game: GameState = action.payload;
                const gamesString: string | null = localStorage.getItem('games');
                const gamesList: GameState[] = gamesString ? JSON.parse(gamesString) : [];

                //? Check wether game already exists
                const gameExists = gamesList.some((gameInfo: GameState, index: number) => {
                    return gameInfo.id === game.id;
                });

                if (gameExists) {
                    //? Save game to local storage
                    const filteredGamesList = gamesList.filter((gameInfo) => gameInfo.id !== game.id);
                    game.lastPlayed = new Date().getTime();
                    const newGamesList: GameState[] = [...filteredGamesList, game];
                    localStorage.setItem('games', JSON.stringify(newGamesList));

                    //? Set current game in state
                    state.currentGame = action.payload;
                    state.board = loadSudokuArray(action.payload.board);
                } else {
                    const newGamesList: GameState[] = [...gamesList, game];
                    localStorage.setItem('games', JSON.stringify(newGamesList));

                    //? Set current game in state
                    state.currentGame = action.payload;
                    state.board = loadSudoku(action.payload.board);
                }
            } catch (error) {
                console.error(error);
            }
        },

        setCurrentGame(state, action: PayloadAction<GameState>) {
            console.log(action.payload);
            console.log('Set current game');
            state.currentGame = action.payload;
            state.board = loadSudoku(action.payload.board);
        },
    },
});

export const {
    updateCell,
    setSelectedCell,
    toggleEditNotes,
    updateCellNotes,
    updateSettings,
    setCurrentGame,
    setupGame,
    updateGame,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
