'use server';

import axios from 'axios';

const API = process.env.API_BASE || 'http://localhost:4000';
// const API = 'http://localhost:4000';

// locations: 

export const fetchLocations = async () => {
	const response = await axios.get(`${API}/locations`);
	return response.data;
};

export const createLocation = async (location) => {
	const response = await axios.post(`${API}/locations`, location);
	return response.data;
};

export const fetchLocationById = async (locationId) => {
	const response = await axios.get(`${API}/locations/${locationId}`);
	return response.data;
}

export const updateLocation = async (locationId) => {
	const response = await axios.put(`${API}/locations/${locationId}`);
	return response.data;
} 

export const deleteLocation = async (locationId) => {
	const response = await axios.delete(`${API}/locations/${locationId}`);
	return response.data;
}

export const fetchLocationDetails = async (locationId) => {
	const response = await axios.get(`${API}/locations/${locationId}/details`);
	return response.data;
}

export const createLocationReview = async (locationId, review) => {
	const response = await axios.post(`${API}/locations/${locationId}/details`, review);
	return response.data;
}

// users:

export const createUser = async (user) => {
	const response = await axios.post(`${API}/users/`, { user });
	return response.data;
};

export const fetchUsers = async () => {
	const response = await axios.get(`${API}/users/`);
	return response.data;
};

export const fetchUserById = async (userId) => {
	const response = await axios.get(`${API}/users/${userId}`);
	return response.data;
};

export const updateUser = async (userId, user) => {
	const response = await axios.put(`${API}/users/${userId}`, user);
	return response.data;
};

export const deleteUser = async (userId) => {
	const response = await axios.delete(`${API}/users/${userId}`);
	return response.data;
};

export const fetchUserReviews = async (userId) => {
	const response = await axios.get(`${API}/users/${userId}/reviews`);
	return response.data;
};

export const loginAction = async (username, password) => {
	const response = await axios.post(`${API}/users/signin`, { username, password });
	return response.data;
};

export const signupAction = async (username, password) => {
	const response = await axios.post(`${API}/users/signup`, { username, password });
	// console.log(response.data);
	return response.data;
};

// search

export const getSearchResults = async (term) => {
	const response = await axios.put(`${API}/search/${term}`);
	return response.data;
};

export const getLocationsBySearchTerm = async (term) => {
	const response = await axios.put(`${API}/search/${term}/locations`);
	return response.data;
};
