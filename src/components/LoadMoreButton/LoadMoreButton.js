import React from 'react';

// CSS
import './LoadMoreButton.scss';

function LoadMoreButton(props) {
    const {
        handleClick,
        children
    } = props;

    return (
        <button
            type='button'
            className='loadMoreButton'
            onClick={handleClick}>
            {children}
        </button>
    );
}

export default LoadMoreButton;
