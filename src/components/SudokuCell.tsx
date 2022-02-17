import { FormEvent, useContext, useState } from 'react';
import { SudokuContext } from '../screens/Home';
import { useSudokuBoard, useUpdateSudokuBoard } from './SudokuProvider';

interface Cell {
    id: number;
    value: number;
    selected: boolean;
}

interface Props {
    data: Cell;
}

const getRandomNumber = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function SudokuCell({ data }: Props) {
    const [value, setValue] = useState<number>(data.value | 0);
    const context = useSudokuBoard();
    const updateContext = useUpdateSudokuBoard();

    const handleInput = (e: React.KeyboardEvent<HTMLElement>) => {
        // console.log(e.key);
        const key = parseInt(e.key);
        console.log(key);
        if (key >= 0 && key <= 9) setValue(key);
    };

    const handleFocus = (e: any) => {
        console.log('focus');
        // updateContext(getRandomNumber(1, 10));
        updateContext(
            context.map((row: any, index: any) => {
                row.map((cell: any) => {
                    let newCell = cell;
                    newCell.value = 2;
                    return newCell;
                });
            })
        );
        console.log(context);
    };

    return (
        <div tabIndex={data.id} onFocus={handleFocus} onKeyPress={handleInput} className="sudokuCell">
            {/* <input onFocus={handleFocus} onKeyPress={handleInput} className="sudokuCellInput" type="number" min={0} max={9} value={value} /> */}
            <p className="sudokuCellValue">{value}</p>
        </div>
    );
}

export default SudokuCell;
