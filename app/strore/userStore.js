import { create } from 'zustand'

const userStore = create((set) => ({
    user: null,
    setUser: (data) => set((state) => ({user: data})),
    deleteUser: () => set({user: null}),
}))

export default userStore;