// CSS
import './LoadMoreButton.css';

function LoadMoreButton(props) {
    const {
        handleClick,
        children
    } = props;

    return (
        <button
            type='button'
            className='mainButton hoverBuzzOut'
            onClick={handleClick}>
            {children}
        </button>
    );
}

export default LoadMoreButton;
