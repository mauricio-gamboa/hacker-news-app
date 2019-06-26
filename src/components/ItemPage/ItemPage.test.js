import React from 'react';
import ReactDOM from 'react-dom';
import ItemPage from './ItemPage';

describe('ItemPage', () => {
    it('renders without crashing (smoke tests)', () => {
        const props = {
            match: {
                params: {}
            }
        };

        const div = document.createElement('div');
        ReactDOM.render(<ItemPage {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});