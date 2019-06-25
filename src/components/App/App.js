import React, { useState, useEffect } from 'react';

// CSS
import './App.scss';

// Constants
import {
	HACKS_KEY
} from '../../contants';

//Services
import {
	processHacks,
	getHacks
} from '../../services/hacks';

import {
	setItem
} from '../../services/store';

// Components
import HacksList from '../HacksList/HacksList';

function App() {
	const [hacks, setHacks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// Helper function to get the hacks from API.
	const getHacksFromAPI = async currentPage => {
		await processHacks();
		const data = await getHacks(currentPage);
		return data;
	};

	// This effect gets the hacks from the API.
	useEffect(() => {
		const getHacks = async () => {
			const hacks = await getHacksFromAPI(currentPage);
			setHacks(prevState => [...prevState, ...hacks]);
		};

		getHacks();
	}, []);

	// This effect saves the hacks in session storage.
	useEffect(() => {
		setItem(HACKS_KEY, hacks);
	}, [hacks]);

	return (
		<div className='app'>
			{hacks && <HacksList hacks={hacks} />}
		</div>
	);
}

export default App;
