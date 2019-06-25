import React from 'react';

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
        <ul>
            {hacks.map(hack => {
                return (<li><Hack key={hack.id} {...hack} /></li>);
            })}
        </ul>
    );
}

export default HacksList;