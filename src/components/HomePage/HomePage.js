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
import Spinner from '../Spinner/Spinner'

function HomePage() {
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const processData = async () => {
			setIsLoading(true);
			await getItemsIds();
			const data = await getItems(currentPage);
			setIsLoading(false);
			setItems(prevState => [...prevState, ...data]);
		};

		processData();
	}, [currentPage]);

	const hasItems = items
		&& items.length > 0;

	return (
		<main className='page'>
			{isLoading && !hasItems && <Spinner />}
			{hasItems &&
				<React.Fragment>
					<ItemsList
						title={'The latest News from HN!'}
						items={items} />
					<LoadMoreButton
						isLoading={isLoading}
						handleClick={() => setCurrentPage(currentPage + 1)}>
						Load more News
					</LoadMoreButton>
				</React.Fragment>
			}
		</main>
	);
}

export default HomePage;
