import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import ItemsList from './ItemsList';

describe('ItemsList', () => {
    let items;

    beforeEach(() => {
        items = [
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
            },
            {
                by: 'yingw787',
                id: 20280304,
                kids: [
                    20280824
                ],
                parent: 20279569,
                text: 'Text.',
                time: 1561505117,
                type: 'story'
            }
        ];
    });

    test('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItemsList items={items} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('renders the correct title', () => {
        const text = 'This app rocks!';
        const { container } = render(<ItemsList items={items} title={text} />);
        const title = container.querySelector('h2');
        expect(title.textContent).toBe(text);
    });

    test('renders the correct amount of items', () => {
        const { container } = render(<ItemsList items={items} />);
        const allItems = container.querySelectorAll('li');
        expect(allItems.length).toBe(2);
    });

    test('renders the correct amount of items', () => {
        items.length = 1;
        const { container } = render(<ItemsList items={items} />);
        const allItems = container.querySelectorAll('li');
        expect(allItems.length).toBe(1);
    });
});