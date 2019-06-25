import React, { useState } from 'react';

// CSS
import './HackPage.scss';

//Services
import {
    getOneFromStorage
} from '../../services/hacks';

// Components
import HackIcon from '../HackIcon/HackIcon';

function HackPage({ match }) {
    const { id } = match.params;
    const [hack] = useState(() => getOneFromStorage(id));

    if (!hack) {
        return(<h2>404 Hack cannot be found 404</h2>);
    }

    return (
        <div className='page hackPage'>
            <h1>
                <HackIcon type={hack.type} />
                {' '}
                {hack.title}
            </h1>
        </div>
    );
};

export default HackPage;