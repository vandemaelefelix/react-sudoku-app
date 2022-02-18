import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import { setSelectedCell, toggleEditNotes, updateSettings } from '../features/sudoku/sudoku-slice';
import { GameState } from '../utils/interfaces';

function Game() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);
    const location = useLocation();

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
        const gameState = location.state as GameState;
        console.log(gameState);
    }, [location]);

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
