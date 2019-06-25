import React, { useState, useEffect } from 'react';

// CSS
import './HomePage.scss';

//Services
import {
	getAllHacks,
	getHacks
} from '../../services/hacks';

// Components
import HacksList from '../HacksList/HacksList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

function HomePage() {
	const [hacks, setHacks] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const getHacksFromAPI = async () => {
			await getAllHacks();
			const data = await getHacks(currentPage);
			setHacks(prevState => [...prevState, ...data]);
		};

		getHacksFromAPI();
	}, [currentPage]);

	const hasHacks = hacks && hacks.length > 0;

	return (
		<div className='page'>
			{hasHacks && <HacksList hacks={hacks} />}
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
