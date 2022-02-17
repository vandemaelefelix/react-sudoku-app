import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedCell, updateCell } from '../features/sudoku/sudoku-slice';
import { Cell } from '../utils/interfaces';
import SudokuCell from './SudokuCell';

function SudokuGrid() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (!selectedCell) return;

            const keyInt = parseInt(e.key);

            if (keyInt) {
                if (selectedCell !== null && keyInt !== selectedCell.value) {
                    dispatch(updateCell({ cell: selectedCell, value: parseInt(e.key) }));
                }
                return;
            }

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
                    dispatch(updateCell({ cell: selectedCell, value: null }));
                    break;
                case 'Backspace':
                    if (!selectedCell.isEditable) return;
                    dispatch(updateCell({ cell: selectedCell, value: null }));
                    break;
                case 'Escape':
                    dispatch(setSelectedCell(null));
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedCell, dispatch, sudoku]);

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
