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

function ItemPage(routeParams) {
    const { id } = routeParams.match.params;

    const [item] = useState(() => getOneFromStorage(id));
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const processData = async () => {
            if (!item) {
                return;
            }

            const data = await getComments(item.kids, currentPage);
            setComments(prevState => [...prevState, ...data]);
        };

        processData();
    }, [currentPage, item]);

    if (!item) {
        return (<h2>404 Item cannot be found 404</h2>);
    }

    const hasComments = comments.length > 0;
    const allCommentsShown = comments.length === item.kids.length;

    return (
        <main className='page itemPage'>
            <h2>Go back to <a href='/'><i className='fas fa-home'></i></a></h2>
            {item && <Item isItemPage={true} {...item} />}
            {hasComments &&
                <React.Fragment>
                    <ItemsList
                        isItemPage={true}
                        items={comments}
                        title={'Comments'} />
                    {!allCommentsShown &&
                        <LoadMoreButton
                            handleClick={() => setCurrentPage(currentPage + 1)}>
                            Load more comments
                        </LoadMoreButton>
                    }
                </React.Fragment>
            }
        </main>
    );
};

export default ItemPage;