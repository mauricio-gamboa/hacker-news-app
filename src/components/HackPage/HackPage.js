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
    }, [currentPage]);

    if (!hack) {
        return (<h2>404 Hack cannot be found 404</h2>);
    }

    const hasComments = hack && hack.kids && hack.kids.length > 0;

    return (
        <div className='page hackPage'>
            {hack && <Hack {...hack} />}
            {hasComments &&
                <LoadMoreButton
                    handleClick={() => setCurrentPage(currentPage + 1)}>
                    Load more comments
                </LoadMoreButton>
            }
        </div>
    );
};

export default HackPage;