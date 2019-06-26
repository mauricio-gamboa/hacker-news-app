import React from 'react';
import ReactDOM from 'react-dom';
import ItemsList from './ItemsList';

describe('ItemsList', () => {
    const items = [
        {
            by: 'yingw787',
            id: 20280303,
            kids: [
                20280822
            ],
            parent: 20279569,
            text: 'Text.',
            time: 1561505117,
            type: 'comment'
        }
    ];

    it('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItemsList items={items} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});