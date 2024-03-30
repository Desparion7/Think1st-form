import axios from 'axios';

type fetchType = {
	country: string;
	year: string;
};

export const fetchHolidays = async ({ country, year }: fetchType) => {
	const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`;
	try {
		const response = await axios.get(url, {
			headers: {
				'X-Api-Key': '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx',
			},
		});
		if (!response) {
			throw new Error('Network response for all holidays was not ok');
		}
		return response;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};
