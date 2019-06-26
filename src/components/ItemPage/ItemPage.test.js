import React from 'react';
import ReactDOM from 'react-dom';
import ItemPage from './ItemPage';

describe('ItemPage', () => {
    it('renders without crashing (smoke tests)', () => {
        const routeParams = {
            match: {
                params: {}
            }
        };

        const div = document.createElement('div');
        ReactDOM.render(<ItemPage {...routeParams} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});