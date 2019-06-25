import React from 'react';

function HackIcon(props) {
    const {
        type
    } = props;

    const getIcon = type => {
        let icon;

        switch (type) {
            case 'job':
                icon = <i className='fas fa-user-md'></i>;
                break;
            case 'story':
                icon = <i className='fab fa-telegram-plane'></i>;
                break;
            case 'poll':
            case 'pollopt':
                icon = <i className='fas fa-poll'></i>;
                break;
            case 'comment':
                icon = <i className='fas fa-comments'></i>;
                break;
            default:
                icon = null;
        }

        return icon;
    };

    return (getIcon(type));
}

export default HackIcon;