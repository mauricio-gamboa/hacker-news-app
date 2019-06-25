import React from 'react';

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
        type
    } = props;

    const getHost = url => {
        return url ? new URL(url).host : '';
    };

    return (
        <a
            className='hack hoverForward'
            title={title}
            href={url}
            rel='noopener noreferrer'
            target='_blank'>
            <span className='title'>
                {type && <HackIcon type={type} />}
                {` ${title}`}
            </span>
            <span className='meta-data'>
                {`${score} points by ${by} | ${descendants} comments ${url ? '|' : ''} ${getHost(url)}`}
            </span>
        </a>
    );
}

export default Hack;