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
        <ul className="dropdown">
            <li className="dropdownItem">
                <input
                    title="difficulty"
                    type="radio"
                    name="difficulty"
                    id="easy"
                    value="easy"
                    checked={difficulty === 'easy'}
                    onChange={handleRadioButtons}
                    className="dropdownItemInput"
                    hidden
                />
                <label className="dropdownItemLabel" htmlFor="easy">
                    easy
                </label>
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
                    className="dropdownItemInput"
                    hidden
                />
                <label className="dropdownItemLabel" htmlFor="medium">
                    medium
                </label>
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
                    className="dropdownItemInput"
                    hidden
                />
                <label className="dropdownItemLabel" htmlFor="hard">
                    hard
                </label>
            </li>
        </ul>
    );
}
