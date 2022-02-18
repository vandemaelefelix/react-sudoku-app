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

export default Home;
