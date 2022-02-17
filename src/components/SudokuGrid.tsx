import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedCell, updateCell, updateCellNotes } from '../features/sudoku/sudoku-slice';
import { Cell } from '../utils/interfaces';
import SudokuCell from './SudokuCell';

function SudokuGrid() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            // If no cell is selected skip this function
            if (!selectedCell) return;

            // If pressed key was a number, then update the value of the cell
            const keyInt = parseInt(e.key);
            if (keyInt) {
                if (selectedCell !== null && keyInt !== selectedCell.value && selectedCell.isEditable) {
                    if (isEditNotes) {
                        dispatch(updateCellNotes({ cell: selectedCell, note: parseInt(e.key) }));
                    } else {
                        dispatch(updateCell({ cell: selectedCell, value: parseInt(e.key) }));
                    }
                } else if (keyInt === selectedCell.value) {
                    dispatch(updateCell({ cell: selectedCell, value: null }));
                }
                return;
            }

            // Depending on what the pressed key was, move or delete the selected cell
            try {
                switch (e.key) {
                    case 'ArrowUp':
                        dispatch(setSelectedCell(sudoku[selectedCell.row - 1][selectedCell.index]));
                        break;
                    case 'ArrowRight':
                        dispatch(setSelectedCell(sudoku[selectedCell.row][selectedCell.index + 1]));
                        break;
                    case 'ArrowDown':
                        dispatch(setSelectedCell(sudoku[selectedCell.row + 1][selectedCell.index]));
                        break;
                    case 'ArrowLeft':
                        dispatch(setSelectedCell(sudoku[selectedCell.row][selectedCell.index - 1]));
                        break;
                    case 'Delete':
                        if (!selectedCell.isEditable) return;
                        if (isEditNotes) {
                            dispatch(updateCellNotes({ cell: selectedCell, note: null }));
                        } else {
                            dispatch(updateCell({ cell: selectedCell, value: null }));
                        }
                        break;
                    case 'Backspace':
                        if (!selectedCell.isEditable) return;
                        if (isEditNotes) {
                            dispatch(updateCellNotes({ cell: selectedCell, note: null }));
                        } else {
                            dispatch(updateCell({ cell: selectedCell, value: null }));
                        }
                        break;
                    case 'Escape':
                        dispatch(setSelectedCell(null));
                        break;
                    default:
                        break;
                }
            } catch (error) {}
        };

        // Event handler for handling key presses
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedCell, dispatch, sudoku, isEditNotes]);

    return (
        <div className="sudokuGrid">
            {console.log(sudoku)}
            {sudoku.map((row: any, rowIndex: any) =>
                row.map((cell: Cell, cellIndex: number) => (
                    <SudokuCell key={`${rowIndex}${cellIndex}`} data={cell}></SudokuCell>
                ))
            )}
        </div>
    );
}

export default SudokuGrid;
