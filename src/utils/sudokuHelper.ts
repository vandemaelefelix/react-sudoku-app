import { Cell } from './interfaces';

const initializeSudoku = (): Array<Cell[]> => {
    let newSudoku: Array<Cell[]> = [];

    for (let row = 0; row < 9; row++) {
        let rowArray: Cell[] = [];

        for (let cell = 0; cell < 9; cell++) {
            rowArray.push({
                id: parseInt(`${row}${cell}`),
                value: parseInt(`${row}${cell}`),
                isSelected: false,
                isInline: false,
                row: row,
                index: cell,
                isCorrect: true,
                isEditable: true,
                isSameAsSelected: false,
                notes: [],
            });
        }

        newSudoku.push(rowArray);
    }

    return newSudoku;
};

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

const loadSudokuArray = (sudoku: any): Array<Cell[]> => {
    let newSudoku: Array<Cell[]> = [];

    sudoku.forEach((row: Cell[], rowIndex: number) => {
        let newRow: Cell[] = [];
        row.forEach((cell: Cell, cellIndex: number) => {
            newRow.push({
                id: parseInt(`${rowIndex}${cellIndex}`),
                value: cell.value,
                isSelected: cell.isSelected,
                isInline: cell.isInline,
                row: rowIndex,
                index: cellIndex,
                isCorrect: cell.isCorrect,
                isEditable: cell.isEditable,
                isSameAsSelected: cell.isSameAsSelected,
                notes: cell.notes,
            });
        });
        newSudoku.push(newRow);
    });

    return newSudoku;
};

const loadSudoku = (sudoku: Array<number[]> = sudoku1): Array<Cell[]> => {
    let newSudoku: Array<Cell[]> = [];

    sudoku.forEach((row: number[], rowIndex: number) => {
        let newRow: Cell[] = [];
        row.forEach((cell: number, cellIndex: number) => {
            newRow.push({
                id: parseInt(`${rowIndex}${cellIndex}`),
                value: cell === 0 ? null : cell,
                isSelected: false,
                isInline: false,
                row: rowIndex,
                index: cellIndex,
                isCorrect: true,
                isEditable: cell === 0 ? true : false,
                isSameAsSelected: false,
                notes: [],
            });
        });
        newSudoku.push(newRow);
    });

    return newSudoku;
};

const isNumberCorrect = (cell: Cell, board: Array<Cell[]>, value: number) => {
    if (!cell.isEditable) return false;

    let isCorrect = true;

    // Check wether cell value is already used in row
    board[cell.row].forEach((currentCell: Cell) => {
        if (currentCell.id === cell.id) return;
        if (value === currentCell.value) {
            isCorrect = false;
        }
    });

    // Check if cell value occurs in column
    board.forEach((row: Cell[], rowIndex: number) => {
        if (row[cell.index].value === value) {
            isCorrect = false;
        }
    });

    // Check if cell value occurs in square
    const squareX = Math.floor(cell.index / 3);
    const squareY = Math.floor(cell.row / 3);

    board.slice(squareY * 3, squareY * 3 + 3).forEach((row, rowIndex) => {
        row.slice(squareX * 3, squareX * 3 + 3).forEach((currentCell, cellIndex) => {
            if (cell.id === currentCell.id) {
                return;
            }
            if (currentCell.value === value) {
                isCorrect = false;
            }
        });
    });

    return isCorrect;
};

const isCellCorrect = (cell: Cell, board: Array<Cell[]>): boolean => {
    if (cell.value === null) return true;
    let isCorrect = true;

    // Check wether cell value is already used in row
    board[cell.row].forEach((currentCell: Cell) => {
        if (currentCell.id === cell.id) return;
        if (cell.value === currentCell.value) {
            isCorrect = false;
        }
    });

    // Check if cell value occurs in column
    board.forEach((row: Cell[], rowIndex: number) => {
        if (rowIndex === cell.row) return;
        if (row[cell.index].value === cell.value) {
            isCorrect = false;
        }
    });

    // Check if cell value occurs in square
    const squareX = Math.floor(cell.index / 3);
    const squareY = Math.floor(cell.row / 3);

    board.slice(squareY * 3, squareY * 3 + 3).forEach((row, rowIndex) => {
        row.slice(squareX * 3, squareX * 3 + 3).forEach((currentCell, cellIndex) => {
            if (cell.id === currentCell.id) {
                return;
            }
            if (currentCell.value === cell.value) {
                isCorrect = false;
            }
        });
    });

    return isCorrect;
};

// This is used to calculate the state a cell is in. Wether or not it is inline with the selected cell to set styles to the cell
const calculateCellState = (selectedCell: Cell, cell: Cell, board: Array<Cell[]>): boolean => {
    if (cell.id === selectedCell.id) return false;
    if (selectedCell.row === cell.row) {
        return true;
    }
    if (selectedCell.index === cell.index) {
        return true;
    }

    // Square isnt right yet it takes all touching cells but it should take all the cell inside the current sudoku square
    const squareX = Math.floor(selectedCell.index / 3);
    const squareY = Math.floor(selectedCell.row / 3);

    let isInSquare = false;
    board.slice(squareY * 3, squareY * 3 + 3).forEach((row, rowIndex) => {
        row.slice(squareX * 3, squareX * 3 + 3).forEach((currentCell, cellIndex) => {
            if (cell.id === currentCell.id) {
                console.log('This is the selected square');
                isInSquare = true;
                return;
            }
        });
    });
    if (isInSquare) return true;

    return false;
};

export { initializeSudoku, calculateCellState, isCellCorrect, loadSudoku, loadSudokuArray, isNumberCorrect };
