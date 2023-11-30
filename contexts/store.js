import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchLocationsAction } from './store.server';

export const useStore = create(
	persist(
		(set, get) => ({
			locations: [],
			fetchLocations: () => {
				fetchLocationsAction().then((locations) => set({ locations }));
			}
		}),
		{ name: 'locations-storage', getStorage: createJSONStorage() }
	)
);
