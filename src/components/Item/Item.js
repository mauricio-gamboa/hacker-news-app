import React, { useState } from 'react';

// CSS
import './Item.scss';

// Components
import ItemIcon from '../ItemIcon/ItemIcon';

function Item(props) {
    const [isVoted, setIsVoted] = useState(false);

    const getHost = url => {
        return url ? new URL(url).host : '';
    };

    if(props.deleted) {
        return null;
    }

    const title = props.title || props.text;
    const isComment = props.type && props.type === 'comment';

    const displayCommentsLink = !isComment &&
        props.id &&
        props.kids &&
        props.kids.length &&
        !props.isItemPage;

    const isTitleLink = !isComment &&
        props.url &&
        props.type;

    return (
        <article
            className='item hoverForward'>

            {isComment &&
                <div className={`title ${isVoted ? 'voted' : ''}`}>
                    {props.type && <ItemIcon type={props.type} />}
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                </div>}

            {isTitleLink &&
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
                {props.by && <span>{`by ${props.by}`}</span>}
                {displayCommentsLink &&
                    <span>
                        {' | '}<a href={`item/${props.id}`}>{`${props.kids.length} comments`}</a>
                    </span>
                }
                {props.url && <span>{`${props.url ? ' |' : ''} ${getHost(props.url)}`}</span>}

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