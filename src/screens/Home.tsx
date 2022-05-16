import { stringify } from 'querystring';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SudokuGrid from '../components/SudokuGrid';
import { setSelectedCell, toggleEditNotes, updateSettings } from '../features/sudoku/sudoku-slice';
import { GameState } from '../utils/interfaces';

const loadGames = () => {
    const gamesString = localStorage.getItem('games');
    let games: GameState[] = [];
    if (gamesString) {
        games = JSON.parse(gamesString);
    }

    return games;
};

const getPreviousGame = (games: GameState[]) => {
    let lastGame: GameState = games[0];
    console.log(lastGame);
    games.forEach((game, index) => {
        if (game.lastPlayed > lastGame.lastPlayed) {
            console.log('this game is newer then the previous one');
            console.log(game);
            lastGame = game;
        }
    });
    return lastGame;
};

function Home() {
    const sudoku = useAppSelector((state) => state.sudoku.board);
    const dispatch = useAppDispatch();
    const selectedCell = useAppSelector((state) => state.sudoku.selectedCell);
    const isEditNotes = useAppSelector((state) => state.sudoku.isEditNotes);
    const settings = useAppSelector((state) => state.sudoku.settings);
    const [games, setGames] = useState(loadGames());
    const [lastGame, setLastGame] = useState(getPreviousGame(games));
    const navigate = useNavigate();

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

    const handleResumeGameClick = () => {
        console.log(lastGame);
        navigate('/game', { state: lastGame });
    };

    return (
        <main className="homeMain">
            <Link
                to={'/game'}
                state={
                    {
                        id: 'new latest game',
                        difficulty: 'Hard',
                        time: null,
                        board: sudoku1,
                        history: [],
                        createdAt: new Date().getTime(),
                        lastPlayed: new Date().getTime(),
                        finished: false,
                    } as GameState
                }
            >
                Start Game
            </Link>
            <div onClick={handleResumeGameClick} className="previousGame">
                <p className="previousGameTitle">continue playing</p>
                <div className="previousGameInfo">
                    <p>{lastGame ? new Date(lastGame.lastPlayed).toDateString() : ''}</p>
                    <p>{lastGame ? lastGame.difficulty : ''}</p>
                </div>
            </div>
        </main>
    );
}

export default Home;
