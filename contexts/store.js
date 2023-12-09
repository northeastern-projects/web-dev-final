import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as store from './store.server';

export const useStore = create(
	persist(
		(set, get) => ({
			user: {
				_id: null,
				username: null
			},
			locations: [],
			userReviews: [],
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
				set({ user: { username: null } });
			},
			addReview: (locationId, review) => {
				store.createLocationReview(locationId, review).then(get().fetchLocations());
			},
			getUserReviews: (userId) => {
				store.fetchUserReviews(userId).then((userReviews) => set({ userReviews }));
			}
		}),
		{ name: 'locations-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);
