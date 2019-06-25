import React, { useState, useEffect } from 'react';

// CSS
import './ItemPage.scss';

//Services
import {
    getOneFromStorage,
    getComments
} from '../../services/items';

// Components
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import ItemsList from '../ItemsList/ItemsList';
import Item from '../Item/Item';

function ItemPage({ match }) {
    const { id } = match.params;

    const [item] = useState(() => getOneFromStorage(id));
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const processData = async () => {
            const data = await getComments(item.kids, currentPage);
            setComments(prevState => [...prevState, ...data]);
        };

        processData();
    }, [currentPage, item]);

    if (!item) {
        return (<h2>404 Item cannot be found 404</h2>);
    }

    const hasComments = comments.length > 0;

    return (
        <div className='page itemPage'>
            {item && <Item {...item} />}
            {hasComments &&
                <div>
                    <ItemsList
                        items={comments}
                        title={'Its Comments:'} />
                    <LoadMoreButton
                        handleClick={() => setCurrentPage(currentPage + 1)}>
                        Load more comments
                    </LoadMoreButton>
                </div>
            }
        </div>
    );
};

export default ItemPage;