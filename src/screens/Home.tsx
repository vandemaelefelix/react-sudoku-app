import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import { setSelectedCell, toggleEditNotes, updateSettings } from '../features/sudoku/sudoku-slice';

function Home() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);

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

    return (
        <main className="homeMain">
            <Link
                to={'/game'}
                state={{
                    id: '123456',
                    difficulty: 'medium',
                    time: null,
                    history: [],
                    createdAt: new Date(),
                    lastPlayed: new Date(),
                }}
            >
                Start Game
            </Link>
        </main>
    );
}

export default Home;
