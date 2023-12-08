'use server';

import axios from 'axios';

// const API = process.env.API_BASE || 'http://localhost:4000';
const API = 'http://localhost:4000';

const request = axios.create({
	withCredentials: true,
});
  
// locations: 

export const fetchLocations = async () => {
	const response = await request.get(`${API}/locations`);
	return response.data;
};

export const createLocation = async (location) => {
	const response = await request.post(`${API}/locations`, location);
	return response.data;
};

export const fetchLocationById = async (locationId) => {
	const response = await request.get(`${API}/locations/${locationId}`);
	return response.data;
}

export const updateLocation = async (locationId) => {
	const response = await request.put(`${API}/locations/${locationId}`);
	return response.data;
} 

export const deleteLocation = async (locationId) => {
	const response = await request.delete(`${API}/locations/${locationId}`);
	return response.data;
}

export const fetchLocationDetails = async (locationId) => {
	const response = await request.get(`${API}/locations/${locationId}/details`);
	return response.data;
}

export const createLocationReview = async (locationId, review) => {
	const response = await request.post(`${API}/locations/${locationId}/details`, review);
	return response.data;
}

export const fetchReviewsByLocation = async (locationId) => {
	const response = await request.get(`${API}/locations/${locationId}/reviews`);
	return response.data;
}

// users:

export const createUser = async (user) => {
	const response = await request.post(`${API}/users/`, { user });
	return response.data;
};

export const fetchUsers = async () => {
	const response = await request.get(`${API}/users/`);
	return response.data;
};

export const fetchUserById = async (userId) => {
	const response = await request.get(`${API}/users/${userId}`);
	return response.data;
};

export const updateUser = async (userId, user) => {
	const response = await request.put(`${API}/users/${userId}`, user);
	return response.data;
};

export const deleteUser = async (userId) => {
	const response = await request.delete(`${API}/users/${userId}`);
	return response.data;
};

export const fetchUserReviews = async (userId) => {
	const response = await request.get(`${API}/users/${userId}/reviews`);
	return response.data;
};

export const loginAction = async (username, password) => {
	const response = await request.post(`${API}/users/signin`, { username, password });
	return response.data;
};

export const signupAction = async (username, password) => {
	const response = await request.post(`${API}/users/signup`, { username, password });
	return response.data;
};

export const signoutAction = async () => {
	const response = await request.post(`${API}/users/signout`, {});
	return response.data;
}

// search

export const getSearchResults = async (term) => {
	const response = await request.put(`${API}/search/${term}`);
	return response.data;
};

export const getLocationsBySearchTerm = async (term) => {
	const response = await request.put(`${API}/search/${term}/locations`);
	return response.data;
};
