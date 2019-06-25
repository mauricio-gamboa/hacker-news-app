import React, { useState, useEffect } from 'react';

// CSS
import './App.scss';

//Services
import {
	processHacks,
	getHacks
} from '../../services/hacks';

// Components
import HacksList from '../HacksList/HacksList';

function App() {
	const [hacks, setHacks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// This effect gets the hacks from the JSON.
	useEffect(() => {
		const _processHacks = async () => {
			const data = await processHacks();
			return data;
		};

		const _initializeData = async () => {
			await _processHacks();
			setHacks(await getHacks(currentPage));
		};

		_initializeData()
	}, []);

	return (
		<div className='app'>
			{hacks && <HacksList hacks={hacks} />}
		</div>
	);
}

export default App;
