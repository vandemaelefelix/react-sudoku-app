import { MouseEventHandler, useState } from 'react';
import { initializeSudoku } from '../utils/sudokuHelper';
import SudokuCell from './SudokuCell';
import { useSudokuBoard, useUpdateSudokuBoard } from './SudokuProvider';

const getRandomNumber = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

interface Cell {
    id: number;
    value: number;
    selected: boolean;
}

function SudokuGrid() {
    // const sudoku = useSudokuBoard();
    // const setSudoku = useUpdateSudokuBoard();
    const [sudoku, setSudoku] = useState<any[]>(useSudokuBoard());

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
