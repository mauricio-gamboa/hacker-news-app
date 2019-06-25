import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// CSS
import './Hack.scss';

// Components
import HackIcon from '../HackIcon/HackIcon';

function Hack(props) {
    const [isVoted, setIsVoted] = useState(false);

    const getHost = url => {
        return url ? new URL(url).host : '';
    };

    const title = props.title || props.text;
    const isComment = props.type === 'comment';

    return (
        <div
            className='item hoverForward'>

            <button
                onClick={() => setIsVoted(!isVoted)}
                type='button'
                className={`vote ${isVoted ? 'voted' : ''}`}>
                <i className='fas fa-caret-up'></i>
            </button>

            <a
                className={`title ${isVoted ? 'voted' : ''}`}
                title={title}
                href={props.url}
                rel='noopener noreferrer'
                target='_blank'>
                {props.type && <HackIcon type={props.type} />}
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </a>

            <div className='meta-data'>
                {props.score && <span>{`${props.score} points `}</span>}
                {`by ${props.by}`}
                {props.hasComments &&
                    <span>
                        {' | '}<Link to={`hack/${props.id}`}>{`${props.kids.length} comments`}</Link>
                    </span>
                }
                {`${props.url ? ' |' : ''} ${getHost(props.url)}`}
            </div>
        </div>
    );
}

export default Hack;