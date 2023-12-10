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
			favoriteLocations: [],
			detailLocations: [],
			userReviews: [],
			search: {
				results: [],
				top: null
			},
			alienUser: {
				_id: null,
				username: null,
				email: null,
				role: null
			},
			fetchLocations: () => {
				store.fetchLocations().then((locations) => set({ locations }));
			},
			fetchLocationsByPlaceId: (placeId) => {
				store.getLocationsByPlaceId(placeId).then((detailLocations) => set({ detailLocations }));
			},
			login: (username, password) => {
				store.loginAction(username, password).then((user) => set({ user }));
			},
			signup: (username, email, password) => {
				store.signupAction(username, email, password).then((user) => set({ user }));
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
					search: {
						results: [],
						top: null
					},
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
			fetchUserFavoriteLocations: (userId) => {
				store.getUserFavoriteLocations(userId).then((favoriteLocations) => set({ favoriteLocations }));
			},
			addFavoriteLocation: (userId, locationId) => {
				store.addUserFavoriteLocation(userId, locationId).then(get().fetchLocations());
			},
			removeFavoriteLocation: (userId, locationId) => {
				store.removeUserFavoriteLocation(userId, locationId).then(get().fetchLocations());
			},
			updateReview: (reviewId, review) => {
				store.editReview(reviewId, review);
			},
			clearSearchResults: () => {
				set({ search: { top: null, results: [] } });
			},
			getSearchResults: (searchTerm) => {
				store.getSearchResults(searchTerm).then((searchResults) => set({ search: { top: searchResults.places[0], results: searchResults } }));
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
