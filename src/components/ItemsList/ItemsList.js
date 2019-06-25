import React from 'react';

// CSS
import './ItemsList.scss';

// Components
import Hack from '../Hack/Hack';

function ItemsList(props) {
    const {
        items,
        title
    } = props;

    console.log(items);

    if (!items.length) {
        return null;
    }

    return (
        <div>
            <h2>{title}</h2>
            <ul className='itemsList'>
                {items.map(item => {
                    const hasComments = item && item.kids && item.length > 0;
                    
                    return (
                        <li key={item.id}>
                            <Hack
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