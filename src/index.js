// CSS
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import HomePage from './components/HomePage/HomePage';
import ItemPage from './components/ItemPage/ItemPage';

const routing = (
    <Router>
        <div>
            <Route exact path='/' component={HomePage} />
            <Route path='/item/:id' component={ItemPage} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));