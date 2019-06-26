import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
    it('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoadMoreButton />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('reders the correct text', () => {
        const text = 'Werkspot is really cool.'
        const { getByText } = render(<LoadMoreButton>{text}</LoadMoreButton>);
        expect(getByText(text)).toBeInTheDocument();
    });

    test('calls the handleClick prop', () => {
        const handleClickMock = jest.fn();
        const { container } = render(<LoadMoreButton handleClick={handleClickMock} />);
        const button = container.firstChild;
        fireEvent.click(button);
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
});