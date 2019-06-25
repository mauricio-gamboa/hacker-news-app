import React, { useState, useEffect } from 'react';

// CSS
import './HackPage.scss';

//Services
import {
    getOneFromStorage,
    getComments
} from '../../services/hacks';

// Components
import Hack from '../Hack/Hack';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import ItemsList from '../ItemsList/ItemsList';

function HackPage({ match }) {
    const { id } = match.params;

    const [hack] = useState(() => getOneFromStorage(id));
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const processData = async () => {
            const data = await getComments(hack.kids, currentPage);
            setComments(prevState => [...prevState, ...data]);
        };

        processData();
    }, [currentPage, hack]);

    if (!hack) {
        return (<h2>404 Hack cannot be found 404</h2>);
    }

    const hasComments = comments.length > 0;

    return (
        <div className='page hackPage'>
            <h2>The Hacker New</h2>
            {hack && <Hack {...hack} />}
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

export default HackPage;