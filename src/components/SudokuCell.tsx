import { useAppDispatch } from '../app/hooks';
import { setSelectedCell } from '../features/sudoku/sudoku-slice';
import { Cell } from '../utils/interfaces';

interface Props {
    data: Cell;
}

function SudokuCell({ data }: Props) {
    const dispatch = useAppDispatch();

    const handleClick = (e: any) => {
        dispatch(setSelectedCell(data));
    };

    return (
        <div
            tabIndex={data.id}
            onClick={(e) => handleClick(e)}
            className={`
                sudokuCell 
                ${data.isSelected ? 'selected' : ''} 
                ${data.isInline ? 'inline' : ''}
                ${data.isCorrect ? 'correct' : 'wrong'}
                ${data.isSameAsSelected ? 'same' : ''}
            `}
        >
            <p
                className={`
            sudokuCellValue
            ${data.isEditable ? '' : 'nonEditable'}
            `}
            >
                {data.value}
            </p>
            {data.value === null && data.notes.length > 0 ? (
                <div className={`sudokuCellNotes`}>
                    {Array.from(Array(9).keys()).map((value: number) => (
                        <div>
                            <p key={value}>{data.notes.includes(value + 1) ? value + 1 : ''}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default SudokuCell;
