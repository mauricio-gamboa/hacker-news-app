import React from 'react';
import ReactDOM from 'react-dom';
import ItemIcon from './ItemIcon';

describe('ItemIcon', () => {
    it('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItemIcon />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});