import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateGame } from '../features/sudoku/sudoku-slice';

interface Props {
    gameId: string;
    previousTime: number;
}

const getTimeString = (timeNumber: number) => {
    const minutes = Math.floor(timeNumber / 60);
    const seconds = timeNumber - minutes * 60;
    return `${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`;
};

export default function SudokuTimer({ gameId, previousTime }: Props) {
    const [timer, setTimer] = useState(getTimeString(previousTime));
    const [timerInterval, setTimerInterval] = useState<any>();
    const [currentTime, setCurrentTime] = useState(previousTime ? previousTime : 0);
    const currentGame = useAppSelector((state) => state.sudoku.currentGame);
    const [isPaused, setIsPaused] = useState<boolean>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentGame?.isPaused === null) return;

        setIsPaused(currentGame?.isPaused);

        let time = currentTime;

        const timerFunction = () => {
            if (currentGame === null) return;
            time += 1;
            if (time >= 3600) {
                console.log('End game');
                return;
            }

            setTimer(getTimeString(time));
            setCurrentTime(time);

            dispatch(
                updateGame({
                    gameId: gameId,
                    updateProperties: { time: time, lastPlayed: new Date().getTime() },
                })
            );
        };

        if (currentGame?.isPaused) {
            clearInterval(timerInterval);
        } else {
            if (currentGame?.isPaused === isPaused) return;
            timerFunction();
            setTimerInterval(setInterval(timerFunction, 1000));
        }

        return () => {
            clearInterval(timerInterval);
            setCurrentTime(time);
        };
    }, [currentGame]);

    useEffect(() => {
        clearInterval(timerInterval);
        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    return (
        <div className={`timer`}>
            <p>{timer}</p>
        </div>
    );
}
