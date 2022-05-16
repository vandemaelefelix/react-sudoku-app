import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import SudokuKeyboard from '../components/SudokuKeyboard';
import {
    setCurrentGame,
    setSelectedCell,
    toggleEditNotes,
    updateSettings,
    setupGame,
    updateGame,
} from '../features/sudoku/sudoku-slice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GameState } from '../utils/interfaces';

function Game() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);
    const location = useLocation();
    // const [games, setGames] = useLocalStorage('games', new Array<string>());

    const handleToggleEdit = () => {
        dispatch(toggleEditNotes());
    };

    const handleToggleGuides = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ guides: !settings.guides }));
            dispatch(setSelectedCell(selectedCell));
        }
    };

    const handleHighlightSameNumbers = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ highlightSameNumbers: !settings.highlightSameNumbers }));
            dispatch(setSelectedCell(selectedCell));
        }
    };
    const handleHideImpossibleNumbers = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ hideImpossibleNumbers: !settings.hideImpossibleNumbers }));
            dispatch(setSelectedCell(selectedCell));
        }
    };
    const handleShowMistakes = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ showMistakes: !settings.showMistakes }));
            dispatch(setSelectedCell(selectedCell));
        }
    };

    useLayoutEffect(() => {
        console.log(location.state as GameState);
        dispatch(setupGame(location.state as GameState));
        // dispatch(updateGame({ gameId: 'newGameId', updateProperties: { difficulty: 'hard' } }));

        return () => {
            if (sudoku.length > 0) {
                dispatch(updateGame({ gameId: (location.state as GameState).id, updateProperties: { board: sudoku } }));
            }
        };
    }, []);

    // // TODO: Not sure if this is necessary: saves everything to localStorage every time the board changes
    // useEffect(() => {
    //     if (sudoku.length > 0) {
    //         console.log(sudoku);
    //         dispatch(updateGame({ gameId: (location.state as GameState).id, updateProperties: { board: sudoku } }));
    //     }
    //     return () => {
    //         console.log('Game component cleared');
    //     };
    // }, [sudoku]);

    return (
        <main className="gameMain">
            <div className="gameInfo">
                <p></p>
            </div>
            <SudokuGrid></SudokuGrid>
            <div className="sudokuButtons">
                <button className={`editNotesButton ${isEditNotes ? 'active' : ''}`} onClick={handleToggleEdit}>
                    Toggle Edit
                </button>
                <button className={`editNotesButton ${isEditNotes ? 'active' : ''}`} onClick={handleToggleGuides}>
                    Toggle guides
                </button>
                <button
                    className={`editNotesButton ${isEditNotes ? 'active' : ''}`}
                    onClick={handleHighlightSameNumbers}
                >
                    Highlight same highlight same numbers
                </button>
                <button
                    className={`editNotesButton ${isEditNotes ? 'active' : ''}`}
                    onClick={handleHideImpossibleNumbers}
                >
                    Hide impossible numbers
                </button>
                <button className={`editNotesButton ${isEditNotes ? 'active' : ''}`} onClick={handleShowMistakes}>
                    Show mistakes
                </button>
            </div>
            <SudokuKeyboard></SudokuKeyboard>
        </main>
    );
}

export default Game;
