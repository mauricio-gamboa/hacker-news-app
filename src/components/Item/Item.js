import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// CSS
import './Item.scss';

// Components
import ItemIcon from '../ItemIcon/ItemIcon';

function Item(props) {
    const [isVoted, setIsVoted] = useState(false);

    const getHost = url => {
        return url ? new URL(url).host : '';
    };

    const title = props.title || props.text;

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
                {props.type && <ItemIcon type={props.type} />}
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </a>

            <div className='meta-data'>
                {props.score && <span>{`${props.score} points `}</span>}
                {`by ${props.by}`}
                {props.hasComments &&
                    <span>
                        {' | '}<Link to={`item/${props.id}`}>{`${props.kids.length} comments`}</Link>
                    </span>
                }
                {`${props.url ? ' |' : ''} ${getHost(props.url)}`}
            </div>
        </div>
    );
}

export default Item;