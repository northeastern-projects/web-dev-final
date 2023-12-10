import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as store from './store.server';

export const useStore = create(
	persist(
		(set, get) => ({
			user: {
				_id: null,
				username: null,
				email: null,
				role: null
			},
			locations: [],
			userReviews: [],
			searchResults: null,
			alienUser: {
				_id: null,
				username: null,
				email: null,
				role: null
			},
			fetchLocations: () => {
				store.fetchLocations().then((locations) => set({ locations }));
			},
			login: (username, password) => {
				store.loginAction(username, password).then((user) => set({ user }));
			},
			signup: (username, password) => {
				store.signupAction(username, password).then((user) => set({ user }));
			},
			logout: () => {
				set({
					user: {
						_id: null,
						username: null,
						email: null,
						role: null
					},
					userReviews: [],
					searchResults: null,
					alienUser: {
						_id: null,
						username: null,
						email: null,
						role: null
					}
				});
			},
			addReview: (locationId, review) => {
				store.createLocationReview(locationId, review).then(get().fetchLocations());
			},
			fetchUserReviews: (userId) => {
				store.fetchUserReviews(userId).then((userReviews) => set({ userReviews }));
			},
			updateReview: (reviewId, review) => {
				store.editReview(reviewId, review);
			},
			search: (searchTerm) => {
				store.getSearchResults(searchTerm).then((searchResults) => set({ searchResults }));
			},
			addLocation: (location) => {
				store.createLocation(location).then(get().fetchLocations());
			},
			deleteReview: (reviewId) => {
				store.deleteReview(reviewId).then(get().fetchLocations());
			},
			fetchAlienUser: (userId) => {
				store.fetchUserById(userId).then((alienUser) => set({ alienUser }));
			}
		}),
		{ name: 'locations-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);
