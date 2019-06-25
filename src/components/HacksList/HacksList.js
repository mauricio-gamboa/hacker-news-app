import React from 'react';

// CSS
import './HacksList.scss';

// Components
import Hack from '../Hack/Hack';

function HacksList(props) {
    const {
        hacks
    } = props;

    if (!hacks.length) {
        return null;
    }

    return (
        <div>
            <h2>The latest hacker news:</h2>
            <ul className='hacksList'>
                {hacks.map(hack => {
                    return (<li key={hack.id}><Hack {...hack} /></li>);
                })}
            </ul>
        </div>
    );
}

export default HacksList;