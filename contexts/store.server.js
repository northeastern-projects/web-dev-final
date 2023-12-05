'use server';

import axios from 'axios';

const API = process.env.API_BASE || 'http://localhost:4000';

export const fetchLocationsAction = async () => {
	const response = await axios.get(`${API}/locations`);
	return response.data;
};

export const loginAction = async (username, password) => {
	const response = await axios.post(`${API}/users/signin`, { username, password });
	return response.data;
};

export const signupAction = async (username, password) => {
	const response = await axios.post(`${API}/users/signup`, { username, password });
	return response.data;
};
