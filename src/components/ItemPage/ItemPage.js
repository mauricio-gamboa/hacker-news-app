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
import Spinner from '../Spinner/Spinner'

function ItemPage(props) {
    const { match } = props;

    const [item] = useState(() => getOneFromStorage(match.params.id));
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const processData = async () => {
            if (!item) {
                return;
            }

            setIsLoading(true);
            const data = await getComments(item.kids, currentPage);
            setIsLoading(false);
            setComments(prevState => [...prevState, ...data]);
        };

        processData();
    }, [currentPage, item]);

    if (!item) {
        return (
            <div className='page itemPage'>
                <h2>404 Item cannot be found 404 <a href='/'><i className='fas fa-home'></i></a></h2>
            </div>
        );
    }

    const hasComments = comments.length > 0;
    const allCommentsShown = comments.length === item.kids.length;

    return (
        <main className='page itemPage'>
            <h2>Go back to <a href='/'><i className='fas fa-home'></i></a></h2>
            {item && <Item isItemPage={true} {...item} />}
            {isLoading && !hasComments && <Spinner />}
            {hasComments &&
                <React.Fragment>
                    <ItemsList
                        isItemPage={true}
                        items={comments}
                        title={'Comments'} />
                    {!allCommentsShown &&
                        <LoadMoreButton
                            isLoading={isLoading}
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