import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './screens/Game';

import Home from './screens/Home';
import './styles/main.scss';

function App() {
    return (
        <div data-theme="light">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/game" element={<Game />}></Route>
            </Routes>
        </div>
    );
}

export default App;
