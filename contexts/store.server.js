'use server';

import axios from 'axios';

const API = process.env.API_BASE || 'http://localhost:4000';
const LOCATIONS_URL = `${API}/locations`;

export const fetchLocationsAction = async () => {
	const response = await axios.get(LOCATIONS_URL);
	return response.data;
};
