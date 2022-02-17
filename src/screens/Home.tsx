import { createContext, useState } from 'react';
import SudokuGrid from '../components/SudokuGrid';
import { SudokuProvider } from '../components/SudokuProvider';
import { initializeSudoku } from '../utils/sudokuHelper';

export const SudokuContext = createContext('');

function Home() {
    const [sudoku, setSudoku] = useState(initializeSudoku());

    return (
        <SudokuProvider value={sudoku}>
            <main className="homeMain">
                <SudokuGrid></SudokuGrid>
            </main>
        </SudokuProvider>
    );
}

export default Home;
