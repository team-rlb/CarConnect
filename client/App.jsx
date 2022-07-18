import React from 'react';
import MainContainer from './containers/MainContainer'
import { Routes, Route } from 'react-router-dom';
// import Trends from './containers/Trends';
import CarsInfo from './containers/CarsInfo';

const App = () => (
    <div id='app'>
        <MainContainer />
        <Routes>
            <Route
                exact path="/"
                element={<CarsInfo />}
            />
            {/* <Route
                exact path="/trends"
                element={<Trends />}
            /> */}
        </Routes>
    </div>
);

export default App;