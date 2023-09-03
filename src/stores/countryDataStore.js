import { readable } from 'svelte/store';

const fetchCountryData = async () => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		if (!response.ok) {
			throw new Error(`${response.status}`);
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const countryDataStore = readable([], function start(set) {
	const fetchData = async () => {
		try {
			const data = await fetchCountryData();
			set(data);
		} catch (error) {
			console.error(error);
		}
	};

	fetchData();
});
