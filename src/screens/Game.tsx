import { current } from '@reduxjs/toolkit';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import SudokuKeyboard from '../components/SudokuKeyboard';
import SudokuTimer from '../components/SudokuTimer';
import {
    setCurrentGame,
    setSelectedCell,
    toggleEditNotes,
    updateSettings,
    setupGame,
    updateGame,
    updateCellNotes,
    updateCell,
} from '../features/sudoku/sudoku-slice';
import { GameState } from '../utils/interfaces';

function Game() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);
    const currentGame = useAppSelector((state) => state.sudoku.currentGame);
    const location = useLocation();
    // const [games, setGames] = useLocalStorage('games', new Array<string>());

    const [gameUpdateTimeout, setGameUpdateTimeout] = useState<any>();
    const [isPaused, setIsPaused] = useState(true);

    const handleToggleEdit = () => {
        dispatch(toggleEditNotes());
    };
    const handleErase = () => {
        if (selectedCell === null) return;
        if (!selectedCell.isEditable) return;
        if (isEditNotes) {
            dispatch(updateCellNotes({ cell: selectedCell, note: null }));
        } else {
            dispatch(updateCell({ cell: selectedCell, value: null }));
        }
    };
    const handleToggleGuides = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ guides: !settings.guides }));
            dispatch(setSelectedCell(selectedCell));
        }
    };
    const handleHighlightSameNumbers = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ highlightSameNumbers: !settings.highlightSameNumbers }));
            dispatch(setSelectedCell(selectedCell));
        }
    };
    const handleHideImpossibleNumbers = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ hideImpossibleNumbers: !settings.hideImpossibleNumbers }));
            dispatch(setSelectedCell(selectedCell));
        }
    };
    const handleShowMistakes = () => {
        if (settings) {
            console.log(settings);
            dispatch(updateSettings({ showMistakes: !settings.showMistakes }));
            dispatch(setSelectedCell(selectedCell));
        }
    };

    useEffect(() => {
        console.log('This is the route location value');
        console.log(location.state as GameState);
        console.log('This is the route location value');

        dispatch(setupGame(location.state as GameState));
        dispatch(
            updateGame({
                gameId: (location.state as GameState).id,
                updateProperties: { isPaused: true },
            })
        );
        setIsPaused(true);

        return () => {
            if (sudoku.length > 0) {
                dispatch(
                    updateGame({
                        gameId: (location.state as GameState).id,
                        updateProperties: { board: sudoku, isPaused: true },
                    })
                );
            }
        };
    }, []);

    useEffect(() => {
        if (currentGame === null) return;
        setIsPaused(currentGame.isPaused);

        return () => {};
    }, [currentGame]);

    // TODO: Not sure if this is necessary: saves everything to localStorage every time the board changes
    useEffect(() => {
        if (gameUpdateTimeout) {
            clearTimeout(gameUpdateTimeout);
        }
        setGameUpdateTimeout(
            setTimeout(() => {
                console.log('Updating Sudoku Game 😎');
                if (sudoku.length > 0) {
                    console.log(sudoku);
                    dispatch(
                        updateGame({
                            gameId: (location.state as GameState).id,
                            updateProperties: { board: sudoku },
                        })
                    );
                }
            }, 2000)
        );

        return () => {
            clearTimeout(gameUpdateTimeout);
        };
    }, [sudoku]);

    return (
        <main className="gameMain">
            <div className="gameInfo">
                <p></p>
            </div>
            <SudokuTimer
                gameId={(location.state as GameState).id}
                previousTime={(location.state as GameState).time || 0}
            ></SudokuTimer>
            {sudoku ? <SudokuGrid></SudokuGrid> : <></>}
            <SudokuKeyboard></SudokuKeyboard>
            <div className="sudokuButtons">
                <div className={`editNotesButton ${isEditNotes ? 'active' : ''}`} onClick={handleToggleEdit}>
                    <svg viewBox="0 0 72.383 72.383">
                        <path
                            d="M71.654,17.792,54.592.73a2.492,2.492,0,0,0-3.524,0l-49.8,49.8a2.494,2.494,0,0,0-.729,1.686L0,69.815a2.491,2.491,0,0,0,2.491,2.568h.076l17.6-.536a2.493,2.493,0,0,0,1.686-.728l49.8-49.8A2.492,2.492,0,0,0,71.654,17.792Zm-52.627,49.1L5.065,67.32,5.49,53.357,35.766,23.08,49.305,36.617Zm33.8-33.8L39.29,19.556,52.83,6.016,66.368,19.554Z"
                            transform="translate(-0.001)"
                        />
                    </svg>
                </div>

                <div
                    className={`playButton`}
                    onClick={() => {
                        dispatch(
                            updateGame({
                                gameId: (location.state as GameState).id,
                                updateProperties: {
                                    lastPlayed: new Date().getTime(),
                                    isPaused: !isPaused,
                                },
                            })
                        );
                    }}
                >
                    {isPaused ? (
                        <svg className={`paused`} viewBox="0 0 378 368">
                            <path
                                d="M154.329,60.955c12.044-24.742,47.3-24.742,59.343,0l131.235,269.6A33,33,0,0,1,315.235,378H52.765a33,33,0,0,1-29.671-47.443Z"
                                transform="translate(378) rotate(90)"
                            />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 300 448">
                            <path
                                d="M0,408a40,40,0,0,1-40-40V0A40,40,0,0,1,0-40,40,40,0,0,1,40,0V368A40,40,0,0,1,0,408Z"
                                transform="translate(40 40)"
                            />
                            <path
                                d="M0,408a40,40,0,0,1-40-40V0A40,40,0,0,1,0-40,40,40,0,0,1,40,0V368A40,40,0,0,1,0,408Z"
                                transform="translate(260 40)"
                            />
                        </svg>
                    )}
                </div>

                <div className={`eraseButton`} onClick={handleErase}>
                    <svg viewBox="0 0 62.553 58.606">
                        <path
                            d="M60.685,71.1H33.38L59.873,44.716a9.152,9.152,0,0,0-.006-12.949L46.808,18.83a9.162,9.162,0,0,0-12.94,0L2.681,49.893a9.152,9.152,0,0,0,.007,12.95L11.033,71.1H1.868a1.83,1.83,0,1,0,0,3.661H60.685a1.83,1.83,0,0,0,0-3.661ZM36.454,21.419a5.5,5.5,0,0,1,7.772.006L57.284,34.362a5.491,5.491,0,0,1,0,7.763L41.437,57.909,20.67,37.141ZM28.192,71.1H16.238L5.269,60.247a5.5,5.5,0,0,1,0-7.763L18.076,39.725,38.843,60.492Z"
                            transform="translate(0 -16.154)"
                        />
                    </svg>
                </div>
            </div>
        </main>
    );
}

export default Game;
