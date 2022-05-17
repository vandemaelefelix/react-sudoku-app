import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedCell, updateCell, updateCellNotes } from '../features/sudoku/sudoku-slice';
import { isNumberCorrect } from '../utils/sudokuHelper';

export default function SudokuKeyboard() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);

    const [keys, setKeys] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    useEffect(() => {
        if (!settings.hideImpossibleNumbers) return;
        if (selectedCell === null) return;
        if (isEditNotes) {
            setKeys([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            return;
        }
        if (!selectedCell.isEditable) {
            setKeys([]);
            return;
        }

        let possibleKeys: number[] = [];
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((key: number) => {
            const correct = isNumberCorrect(selectedCell, sudoku, key);
            if (correct) {
                possibleKeys.push(key);
            }
        });

        setKeys(possibleKeys);
    }, [selectedCell, sudoku, settings, isEditNotes]);

    const handleClick = (number: number): void => {
        // Check if a cell is selected
        if (!selectedCell) return;

        // Check if the cell can or has to be edited
        if (selectedCell === null || number === selectedCell.value || !selectedCell.isEditable) return;

        // Check if edit notes is on, if so edit notes instead of value
        if (isEditNotes) {
            dispatch(updateCellNotes({ cell: selectedCell, note: number }));
            return;
        }

        // Update cell value
        dispatch(updateCell({ cell: selectedCell, value: number }));
    };

    return (
        <div className={`keyboard`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <div
                    key={number}
                    onClick={() => {
                        if (!keys.includes(number)) return;
                        handleClick(number);
                    }}
                    className={`
                        key
                        ${!keys.includes(number) && settings.hideImpossibleNumbers ? 'inactive' : ''}
                        `}
                >
                    <p>{number}</p>
                </div>
            ))}
        </div>
    );
}
