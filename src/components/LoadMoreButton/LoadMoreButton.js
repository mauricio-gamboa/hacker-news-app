import React from 'react';

// CSS
import './LoadMoreButton.scss';

function LoadMoreButton(props) {
    const {
        handleClick
    } = props;

    return (
        <button
            type='button'
            className='mainButton hoverBuzzOut'
            onClick={handleClick}>
            Load More Hacks
        </button>
    );
}

export default LoadMoreButton;
