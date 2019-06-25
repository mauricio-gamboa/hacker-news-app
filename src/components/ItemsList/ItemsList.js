import React from 'react';

// CSS
import './ItemsList.scss';

// Components
import Item from '../Item/Item';

function ItemsList(props) {
    const {
        items,
        title
    } = props;

    if (!items.length) {
        return null;
    }

    return (
        <div>
            <h2>{title}</h2>
            <ul className='itemsList'>
                {items.map(item => {
                    const hasComments = item &&
                        item.kids &&
                        item.kids.length > 0;

                    return (
                        <li key={item.id}>
                            <Item
                                {...item}
                                hasComments={hasComments} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ItemsList;