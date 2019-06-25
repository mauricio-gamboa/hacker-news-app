import React, { useState, useEffect } from 'react';

// CSS
import './HomePage.scss';

//Services
import {
	getHacksIds,
	getHacks
} from '../../services/hacks';

// Components
import ItemsList from '../ItemsList/ItemsList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

function HomePage() {
	const [hacks, setHacks] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const processData = async () => {
			await getHacksIds();
			const data = await getHacks(currentPage);
			setHacks(prevState => [...prevState, ...data]);
		};

		processData();
	}, [currentPage]);

	const hasHacks = hacks && hacks.length > 0;

	return (
		<div className='page'>
			{hasHacks &&
				<ItemsList
					title={'The latest Hacker News!'}
					items={hacks} />
			}
			{hasHacks &&
				<LoadMoreButton
					handleClick={() => setCurrentPage(currentPage + 1)}>
					Load more hacks
			</LoadMoreButton>
			}
		</div>
	);
}

export default HomePage;
