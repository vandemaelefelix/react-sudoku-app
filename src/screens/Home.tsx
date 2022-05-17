import { stringify } from 'querystring';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Dropdown from '../components/Dropdown';
import SudokuGrid from '../components/SudokuGrid';
import { setSelectedCell, toggleEditNotes, updateSettings } from '../features/sudoku/sudoku-slice';
import getTimeString from '../utils/helperFunctions';
import { GameState } from '../utils/interfaces';

const loadGames = () => {
    const gamesString = localStorage.getItem('games');
    let games: GameState[] = [];
    if (gamesString) {
        games = JSON.parse(gamesString);
    }
    games = games
        .sort((a, b) => {
            return a.createdAt - b.createdAt;
        })
        .reverse();
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
    const [difficulty, setDifficulty] = useState('easy');
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

    const handleResumeGameClick = (game: any) => {
        console.log('Loading: ' + game.id);
        navigate('/game', { state: game });
    };

    const generateUid = () => {
        return (Math.random() + 1).toString(36).substring(2);
    };

    return (
        <main className="homeMain">
            <div className="newGame">
                <Dropdown
                    onChange={(value: string) => {
                        setDifficulty(value);
                    }}
                ></Dropdown>

                <Link
                    to={'/game'}
                    state={
                        {
                            id: generateUid(),
                            difficulty: difficulty,
                            time: null,
                            board: sudoku1,
                            history: [],
                            createdAt: new Date().getTime(),
                            lastPlayed: new Date().getTime(),
                            finished: false,
                            isPaused: true,
                        } as GameState
                    }
                    className="start"
                >
                    Start Game
                </Link>
            </div>
            <div className="gamesContainer">
                <p className="continue">continue playing</p>
                {games.map((game: any) => (
                    <div
                        key={game.id}
                        onClick={() => {
                            handleResumeGameClick(game);
                        }}
                        className="game"
                    >
                        <div className="gameInfo">
                            <p className="difficulty">{game ? game.difficulty : ''}</p>
                            <div className="dateContainer">
                                <svg className="calendar" viewBox="0 0 489.901 465">
                                    <g transform="translate(0 -12.45)">
                                        <g>
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(104.3 193.25)" />
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(224 193.25)" />
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(343.6 193.25)" />
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(104.3 331.65)" />
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(224 331.65)" />
                                            <circle cx="20.5" cy="20.5" r="20.5" transform="translate(343.6 331.65)" />
                                            <path d="M469.2,55.05H420.3V33.25a20.8,20.8,0,1,0-41.6,0v21.8H110.3V33.25a20.8,20.8,0,0,0-41.6,0v21.8H20.8A20.913,20.913,0,0,0,0,75.85v380.8a20.913,20.913,0,0,0,20.8,20.8H468.1c11.4,0,20.8-8.3,21.8-20.8V75.85A20.763,20.763,0,0,0,469.2,55.05Zm-20.8,381.8H40.6V96.75H68.7v15.6a20.8,20.8,0,0,0,41.6,0V96.75H378.7v15.6a20.913,20.913,0,0,0,20.8,20.8c10.4,0,19.8-9.4,20.8-20.8V96.75h28.1Z" />
                                        </g>
                                    </g>
                                </svg>

                                <p className="date">{game ? new Date(game.lastPlayed).toDateString() : ''}</p>
                            </div>
                            <div className="timeContainer">
                                <svg className="clock" viewBox="0 0 562 562">
                                    <path d="M281,40C148.112,40,40,148.112,40,281S148.112,522,281,522,522,413.888,522,281,413.888,40,281,40m0-40C436.192,0,562,125.808,562,281S436.192,562,281,562,0,436.192,0,281,125.808,0,281,0Z" />
                                    <path
                                        d="M0,187a20,20,0,0,1-20-20V0A20,20,0,0,1,0-20,20,20,0,0,1,20,0V167A20,20,0,0,1,0,187Z"
                                        transform="translate(281.5 114.5)"
                                    />
                                    <path
                                        d="M57.507,85A19.95,19.95,0,0,1,42.52,78.251l-57.5-65A20,20,0,0,1-13.251-14.98,20,20,0,0,1,14.98-13.251l57.5,65A20,20,0,0,1,57.507,85Z"
                                        transform="translate(281 281.5)"
                                    />
                                </svg>

                                <p className="time">{game ? getTimeString(game.time) : ''}</p>
                            </div>
                        </div>
                        <div className="playPause">
                            <div className={`pausedButton`}>
                                <svg viewBox="0 0 378 368">
                                    <path
                                        d="M154.329,60.955c12.044-24.742,47.3-24.742,59.343,0l131.235,269.6A33,33,0,0,1,315.235,378H52.765a33,33,0,0,1-29.671-47.443Z"
                                        transform="translate(378) rotate(90)"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Home;
