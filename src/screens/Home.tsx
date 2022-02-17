import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import { toggleEditNotes } from '../features/sudoku/sudoku-slice';

function Home() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);

    const handleToggleEdit = () => {
        dispatch(toggleEditNotes());
    };

    return (
        <main className="homeMain">
            <SudokuGrid></SudokuGrid>
            <div className="sudokuButtons">
                <button className={`editNotesButton ${isEditNotes ? 'active' : ''}`} onClick={handleToggleEdit}>
                    Toggle Edit
                </button>
            </div>
        </main>
    );
}

export default Home;
