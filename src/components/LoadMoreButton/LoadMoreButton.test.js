import React from 'react';
import ReactDOM from 'react-dom';
import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
    it('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoadMoreButton />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});