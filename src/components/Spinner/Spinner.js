import React from 'react';

// CSS
import './Spinner.scss';

function Spinner() {
    return (
        <div className='spinner'>
            <div>Loading items from HN...</div>
            <i className='fas fa-spinner fa-spin' />
        </div>
    );
}

export default Spinner;