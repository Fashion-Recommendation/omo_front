import { create } from 'zustand'
import * as authApi from '../api/auth'
import * as memberApi from '../api/member'

// ========== 더미 데이터 ==========
const DUMMY_USER = {
  id: 1,
  username: '홍길동',
  email: 'hong@example.com',
  height: 175,
  weight: 70,
  show_closet: true,
  profile_image_url: 'https://picsum.photos/200',
}

const DUMMY_FASHION_HISTORY = [
  {
    fashion_history_id: 101,
    date: '2025-02-01',
    season: 'winter',
    place: 'school',
    items: [
      {
        fashion_item_id: 20,
        name: '패딩 점퍼',
        image_url: 'https://picsum.photos/seed/padding/200',
      },
      {
        fashion_item_id: 51,
        name: '화이트 니트',
        image_url: 'https://picsum.photos/seed/knit/200',
      },
    ],
  },
  {
    fashion_history_id: 102,
    date: '2025-01-28',
    season: 'winter',
    place: 'date',
    items: [
      {
        fashion_item_id: 200,
        name: '네이비 코트',
        image_url: 'https://picsum.photos/seed/coat/200',
      },
      {
        fashion_item_id: 102,
        name: '블랙 슬랙스',
        image_url: 'https://picsum.photos/seed/slacks/200',
      },
    ],
  },
]

const useUserStore = create((set, get) => ({
  // ========== State ==========
  currentUser: DUMMY_USER,
  isLoggedIn: true,
  isLoading: false,
  error: null,
  fashionHistory: DUMMY_FASHION_HISTORY,

  // ========== Auth Actions ==========
  login: async (loginId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authApi.login(loginId)
      if (response.available) {
        await get().fetchMyInfo()
        set({ isLoggedIn: true })
      }
      return response
    } catch (error) {
      // API 실패 시 더미 데이터 사용
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ currentUser: DUMMY_USER, isLoggedIn: true })
      return { available: true }
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authApi.logout()
    } catch (error) {
      console.warn('로그아웃 API 실패:', error.message)
    } finally {
      localStorage.removeItem('accessToken')
      set({
        currentUser: null,
        isLoggedIn: false,
        fashionHistory: [],
        isLoading: false,
      })
    }
  },

  // ========== Member Actions ==========
  fetchMyInfo: async () => {
    set({ isLoading: true, error: null })
    try {
      const user = await memberApi.getMyInfo()
      set({ currentUser: user, isLoggedIn: true })
      return user
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ currentUser: DUMMY_USER, isLoggedIn: true })
      return DUMMY_USER
    } finally {
      set({ isLoading: false })
    }
  },

  updateMyInfo: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const updatedUser = await memberApi.updateMyInfo(data)
      set({ currentUser: updatedUser })
      return updatedUser
    } catch (error) {
      console.warn('API 연결 실패, 로컬 업데이트:', error.message)
      const updatedUser = { ...get().currentUser, ...data }
      set({ currentUser: updatedUser })
      return updatedUser
    } finally {
      set({ isLoading: false })
    }
  },

  fetchFashionHistory: async () => {
    set({ isLoading: true, error: null })
    try {
      const history = await memberApi.getFashionHistory()
      set({ fashionHistory: history })
      return history
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ fashionHistory: DUMMY_FASHION_HISTORY })
      return DUMMY_FASHION_HISTORY
    } finally {
      set({ isLoading: false })
    }
  },

  saveFashionHistory: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await memberApi.saveFashionHistory(data)
      if (response.success) {
        await get().fetchFashionHistory()
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 저장:', error.message)
      const newHistory = {
        fashion_history_id: Date.now(),
        ...data,
        items: [],
      }
      set((state) => ({
        fashionHistory: [newHistory, ...state.fashionHistory],
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Local Actions ==========
  setCurrentUser: (user) => set({ currentUser: user }),
  clearError: () => set({ error: null }),
}))

export default useUserStore
