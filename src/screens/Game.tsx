import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
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

    useEffect(() => {
        dispatch(setupGame(location.state as GameState));
        // dispatch(updateGame({ gameId: 'newGameId', updateProperties: { difficulty: 'hard' } }));
    }, []);

    // TODO: Not sure if this is necessary: saves everything to localStorage every time the board changes
    useEffect(() => {
        dispatch(updateGame({ gameId: (location.state as GameState).id, updateProperties: { board: sudoku } }));
    }, [sudoku]);

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
            </div>
        </main>
    );
}

export default Game;
