import { createContext, useContext, useState } from 'react';

const SudokuBoardContext = createContext<any>(null);
const UpdateSudokuBoardContext = createContext<any>(null);

export const useSudokuBoard = () => {
    return useContext(SudokuBoardContext);
};
export const useUpdateSudokuBoard = () => {
    return useContext(UpdateSudokuBoardContext);
};

export function SudokuProvider({ children, value }: any) {
    const [sudoku, setSudoku] = useState(value);

    return (
        <SudokuBoardContext.Provider value={sudoku}>
            <UpdateSudokuBoardContext.Provider value={setSudoku}>{children}</UpdateSudokuBoardContext.Provider>
        </SudokuBoardContext.Provider>
    );
}

export default SudokuProvider;
