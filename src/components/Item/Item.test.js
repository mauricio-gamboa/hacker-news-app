import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
    let item;

    beforeEach(() => {
        item = {
            by: 'joshfraser',
            descendants: 13,
            id: 20279569,
            kids: [
                20280303,
                20280503
            ],
            score: 100,
            time: 1561500640,
            title: 'At Japan’s cliffs, he is walked more than 600 people back from the edge (2018)',
            type: 'story',
            url: 'http://www.latimes.com/world/asia/la-fg-japan-suicide-20180222-story.html',
            hasComments: true
        };
    });

    test('renders without crashing (smoke tests)', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Item {...item} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('renders the title', () => {
        const { container } = render(<Item {...item} />);
        const title = container.querySelector('.title span');
        expect(title.textContent).toBe(item.title);
    });

    test('the title should be an a', () => {
        const { container } = render(<Item {...item} />);
        const wrapper = container.querySelector('.item')
        const title = container.querySelector('a.title');
        expect(wrapper).toContainElement(title);
    });

    test('the title to have the correct url', () => {
        const { container } = render(<Item {...item} />);
        const title = container.querySelector('a.title');
        expect(title).toHaveAttribute('href', item.url);
    });

    test('the title to have the correct target', () => {
        const { container } = render(<Item {...item} />);
        const title = container.querySelector('a.title');
        expect(title).toHaveAttribute('target', '_blank');
    });

    test('the title to have the correct title', () => {
        const { container } = render(<Item {...item} />);
        const title = container.querySelector('a.title');
        expect(title).toHaveAttribute('title', item.title);
    });

    describe('comments', () => {
        beforeEach(() => {
            item.type = 'comment';
        });

        test('the title should be a div', () => {
            const { container } = render(<Item {...item} />);
            const wrapper = container.querySelector('.item')
            const title = container.querySelector('div.title');
            expect(wrapper).toContainElement(title);
        });
    });

    describe('voted item', () => {
        test('toggles the voted state', () => {
            const { container } = render(<Item {...item} />);
            const button = container.querySelector('button');
            fireEvent.click(button);
            const title = container.querySelector('.title');
            expect(title).toHaveClass('voted');
        });

        test('toggles the voted state', () => {
            const { container } = render(<Item {...item} />);
            const title = container.querySelector('.title');
            expect(title).not.toHaveClass('voted');
        });
    });
});