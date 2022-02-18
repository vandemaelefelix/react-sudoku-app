import { stringify } from 'querystring';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import { setSelectedCell, toggleEditNotes, updateSettings } from '../features/sudoku/sudoku-slice';
import { GameState } from '../utils/interfaces';

function Home() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);

    const sudoku1: Array<number[]> = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],

        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],

        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    return (
        <main className="homeMain">
            <Link
                to={'/game'}
                state={
                    {
                        id: 'newGameId',
                        difficulty: 'medium',
                        time: null,
                        board: sudoku1,
                        history: [],
                        createdAt: new Date().getTime(),
                        lastPlayed: new Date().getTime(),
                        finished: false,
                    } as GameState
                }
            >
                Start Game
            </Link>
        </main>
    );
}

export default Home;
