import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import ItemIcon from './ItemIcon';

describe('ItemIcon', () => {
    it('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItemIcon />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('renders the icon class for jobs', () => {
        const { container } = render(<ItemIcon type={'job'} />);
        const button = container.querySelector('i');
        expect(button).toHaveClass('fas fa-user-md');
    });

    test('renders the icon class for stories', () => {
        const { container } = render(<ItemIcon type={'story'} />);
        const button = container.querySelector('i');
        expect(button).toHaveClass('fas fa-book');
    });

    test('renders the icon class for polls', () => {
        const { container } = render(<ItemIcon type={'poll'} />);
        const button = container.querySelector('i');
        expect(button).toHaveClass('fas fa-poll');
    });

    test('renders the icon class for pollopts', () => {
        const { container } = render(<ItemIcon type={'pollopt'} />);
        const button = container.querySelector('i');
        expect(button).toHaveClass('fas fa-poll');
    });

    test('renders the icon class for comments', () => {
        const { container } = render(<ItemIcon type={'comment'} />);
        const button = container.querySelector('i');
        expect(button).toHaveClass('fas fa-comments');
    });
});