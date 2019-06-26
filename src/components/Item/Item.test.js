import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';

describe('Item', () => {
    test('renders without crashing (smoke tests)', () => {
        const props = {
            kids: [{}]
        };
        
        const div = document.createElement('div');
        ReactDOM.render(<Item {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});