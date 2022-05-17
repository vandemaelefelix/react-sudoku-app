import { useState } from 'react';

interface Props {
    onChange: Function;
}

export default function Dropdown({ onChange }: Props) {
    const [difficulty, setDifficulty] = useState('easy');

    const handleRadioButtons = (event: any) => {
        setDifficulty(event.target.value);
        onChange(event.target.value);
    };

    return (
        <ul>
            <li>
                <input
                    title="difficulty"
                    type="radio"
                    name="difficulty"
                    id="easy"
                    value="easy"
                    checked={difficulty === 'easy'}
                    onChange={handleRadioButtons}
                />
                <label htmlFor="easy">easy</label>
            </li>
            <li>
                <input
                    title="difficulty"
                    type="radio"
                    name="difficulty"
                    id="medium"
                    value="medium"
                    checked={difficulty === 'medium'}
                    onChange={handleRadioButtons}
                />
                <label htmlFor="medium">medium</label>
            </li>
            <li>
                <input
                    title="difficulty"
                    type="radio"
                    name="difficulty"
                    id="hard"
                    value="hard"
                    checked={difficulty === 'hard'}
                    onChange={handleRadioButtons}
                />
                <label htmlFor="hard">hard</label>
            </li>
        </ul>
    );
}
