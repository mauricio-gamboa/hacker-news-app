import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
	test('renders without crashing (smoke tests)', () => {
		const div = document.createElement('div');
		ReactDOM.render(<HomePage />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
