import { create } from 'zustand'

const locationStore = create((set) => ({
    globalCurrentLocation: null,
    setGlobalCurrentLocation: (data) => set((state) => ({globalCurrentLocation: data})),
    deleteGlobalCurrentLocation: () => set({globalCurrentLocation: null}),
}))

export default locationStore;