import React, { useState, useEffect } from 'react';

// CSS
import './HomePage.scss';

//Services
import {
	getItemsIds,
	getItems
} from '../../services/items';

// Components
import ItemsList from '../ItemsList/ItemsList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

function HomePage() {
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const processData = async () => {
			await getItemsIds();
			const data = await getItems(currentPage);
			setItems(prevState => [...prevState, ...data]);
		};

		processData();
	}, [currentPage]);

	const hasItems = items && items.length > 0;

	return (
		<main className='page'>
			{hasItems &&
				<React.Fragment>
					<ItemsList
						title={'The latest News from HN!'}
						items={items} />
					<LoadMoreButton
						handleClick={() => setCurrentPage(currentPage + 1)}>
						Load more News
					</LoadMoreButton>
				</React.Fragment>
			}
		</main>
	);
}

export default HomePage;
