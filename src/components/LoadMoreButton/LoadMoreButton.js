import React from 'react';

// CSS
import './LoadMoreButton.scss';

function LoadMoreButton(props) {
    const {
        handleClick,
        children,
        isLoading
    } = props;

    return (
        <button
            type='button'
            className='loadMoreButton'
            onClick={handleClick}>
            {children}
            {' '}
            {isLoading &&
                <i className='fas fa-spinner fa-spin' />
            }
        </button>
    );
}

export default LoadMoreButton;
