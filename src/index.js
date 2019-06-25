// CSS
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import HomePage from './components/HomePage/HomePage';
import HackPage from './components/HackPage/HackPage';

const routing = (
    <Router>
        <div>
            <Route exact path='/' component={HomePage} />
            <Route path='/hack/:id' component={HackPage} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));