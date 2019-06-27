import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
    test('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoadMoreButton />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('reders the correct text', () => {
        const text = 'This app is really cool.'
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

    test('displays spinner if items are loading', () => {
        const { container } = render(<LoadMoreButton isLoading={true} />);
        const spinner = container.querySelector('.fa-spinner');
        expect(spinner).toBeInTheDocument();
    });

    test('displays spinner if items are not loading', () => {
        const { container } = render(<LoadMoreButton isLoading={false} />);
        const spinner = container.querySelector('.fa-spinner');
        expect(spinner).not.toBeInTheDocument();
    });
});