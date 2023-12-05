import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchLocationsAction, loginAction, signupAction } from './store.server';

export const useStore = create(
	persist(
		(set, get) => ({
			user: {
				username: null
			},
			locations: [],
			fetchLocations: () => {
				fetchLocationsAction().then((locations) => set({ locations }));
			},
			login: (username, password) => {
				loginAction(username, password).then((user) => set({ user }));
			},
			signup: (username, password) => {
				signupAction(username, password).then((user) => set({ user }));
			}
		}),
		{ name: 'locations-storage', storage: createJSONStorage() }
	)
);
