import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// CSS
import './Hack.scss';

// Components
import HackIcon from '../HackIcon/HackIcon';

function Hack(props) {
    const {
        title,
        url,
        score,
        by,
        descendants,
        type,
        id
    } = props;

    const [isVoted, setIsVoted] = useState(false);

    const getHost = url => {
        return url ? new URL(url).host : '';
    };

    return (
        <div
            className='hack hoverForward'
            title={title}>
            <button
                onClick={() => setIsVoted(!isVoted)}
                type='button'
                className={`vote ${isVoted ? 'voted' : ''}`}>
                <i className='fas fa-caret-up'></i>
            </button>
            <a
                className='title'
                title={title}
                href={url}
                rel='noopener noreferrer'
                target='_blank'>
                {type && <HackIcon type={type} />}
                {title}
            </a>
            <div className='meta-data'>
                {`${score} points by ${by} | `}
                <Link to={`hack/${id}`}>{`${descendants} comments`}</Link>
                {`${url ? ' |' : ''} ${getHost(url)}`}
            </div>
        </div>
    );
}

export default Hack;