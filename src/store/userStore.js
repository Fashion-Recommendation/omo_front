import { create } from 'zustand'

const useUserStore = create((set) => ({
  currentUser: {
    userId: 'rktclgh',
    username: 'rktclgh',
    avatar: '/avatar.png',
  },
  setCurrentUser: (user) => set({ currentUser: user }),
}))

export default useUserStore
