import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as store from './store.server';

export const useStore = create(
	persist(
		(set, get) => ({
			user: {
				username: null
			},
			locations: [],
			fetchLocations: () => {
				store.fetchLocations().then((locations) => set({ locations }));
			},
			reviews: [],
			fetchReviews: (locationId) => {
				store.fetchReviewsByLocation(locationId).then((reviews) => set({ reviews }))
			},
			login: (username, password) => {
				store.loginAction(username, password).then((user) => set({ user }));
			},
			signup: (username, password) => {
				store.signupAction(username, password).then((user) => set({ user }));
			},
			logout: () => {
				store.signoutAction().then(() => set({user: {username: null}}))
			},
		}),
		{ name: 'locations-storage', storage: createJSONStorage() }
	)
);
