import React, { useState, useEffect } from 'react';

// CSS
import './HomePage.scss';

//Services
import {
	processHacks,
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
			await processHacks();
			const data = await getHacks(currentPage);
			setHacks(prevState => [...prevState, ...data]);
		};

		getHacksFromAPI();
	}, [currentPage]);

	const hasHacks = hacks && hacks.length > 0;

	return (
		<div className='app'>
			{hasHacks && <HacksList hacks={hacks} />}
			{hasHacks && <LoadMoreButton
				handleClick={() => setCurrentPage(currentPage + 1)} />}
		</div>
	);
}

export default HomePage;
