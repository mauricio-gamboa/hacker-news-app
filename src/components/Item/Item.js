import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    const isComment = props.type === 'comment';

    return (
        <article
            className='item hoverForward'>

            {isComment &&
                <div className={`title ${isVoted ? 'voted' : ''}`}>
                    {props.type && <ItemIcon type={props.type} />}
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                </div>}

            {!isComment &&
                <a
                    className={`title ${isVoted ? 'voted' : ''}`}
                    title={title}
                    href={props.url}
                    rel='noopener noreferrer'
                    target='_blank'>
                    {props.type && <ItemIcon type={props.type} />}
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                </a>
            }

            <section className='meta-data'>
                {props.score && <span>{`${props.score} points `}</span>}
                {`by ${props.by}`}
                {!isComment && !props.isItemPage &&
                    <span>
                        {' | '}<Link to={`item/${props.id}`}>{`${props.kids.length} comments`}</Link>
                    </span>
                }
                {`${props.url ? ' |' : ''} ${getHost(props.url)}`}

                <button
                    onClick={() => setIsVoted(!isVoted)}
                    type='button'
                    className={`vote ${isVoted ? 'voted' : ''}`}>
                    <i className='fas fa-caret-up'></i>
                </button>
            </section>
        </article>
    );
}

export default Item;