import { create } from 'zustand'
import * as closetApi from '../api/closet'

// ========== 더미 데이터 ==========
const DUMMY_CLOSET_ITEMS = [
  {
    fashion_item_id: 101,
    name: '화이트 오버핏 티셔츠',
    category: 'top',
    color: 'white',
    style: 'casual',
    season: 'summer',
    size: 'XL',
    image_url: 'https://picsum.photos/seed/tshirt1/300',
    wear_cnt: 12,
    is_on_sale: false,
  },
  {
    fashion_item_id: 102,
    name: '블랙 데님 팬츠',
    category: 'bottom',
    color: 'black',
    style: 'street',
    season: 'all',
    size: 'M',
    image_url: 'https://picsum.photos/seed/pants1/300',
    wear_cnt: 8,
    is_on_sale: true,
  },
  {
    fashion_item_id: 103,
    name: '네이비 롱코트',
    category: 'outer',
    color: 'navy',
    style: 'minimal',
    season: 'winter',
    size: 'L',
    image_url: 'https://picsum.photos/seed/coat1/300',
    wear_cnt: 5,
    is_on_sale: false,
  },
  {
    fashion_item_id: 104,
    name: '화이트 운동화',
    category: 'shoes',
    color: 'white',
    style: 'casual',
    season: 'all',
    size: '270',
    image_url: 'https://picsum.photos/seed/shoes1/300',
    wear_cnt: 20,
    is_on_sale: false,
  },
  {
    fashion_item_id: 105,
    name: '브라운 목폴라 니트',
    category: 'top',
    color: 'brown',
    style: 'casual',
    season: 'winter',
    size: 'L',
    image_url: 'https://picsum.photos/seed/knit1/300',
    wear_cnt: 7,
    is_on_sale: false,
  },
  {
    fashion_item_id: 106,
    name: '그레이 와이드 슬랙스',
    category: 'bottom',
    color: 'gray',
    style: 'minimal',
    season: 'all',
    size: 'M',
    image_url: 'https://picsum.photos/seed/slacks1/300',
    wear_cnt: 10,
    is_on_sale: false,
  },
]

const useClosetStore = create((set, get) => ({
  // ========== State ==========
  items: DUMMY_CLOSET_ITEMS,
  selectedItem: null,
  selectedCategory: '전체',
  isLoading: false,
  error: null,
  showCloset: true,

  // ========== API Actions ==========
  fetchClosetItems: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await closetApi.getClosetItems(userId)
      set({
        items: response.fashion_items || [],
        showCloset: response.showCloset,
      })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ items: DUMMY_CLOSET_ITEMS, showCloset: true })
      return { fashion_items: DUMMY_CLOSET_ITEMS, showCloset: true }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchClothesDetail: async (fashionItemId) => {
    set({ isLoading: true, error: null })
    try {
      const item = await closetApi.getClothesDetail(fashionItemId)
      set({ selectedItem: item })
      return item
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      const dummyItem = DUMMY_CLOSET_ITEMS.find(
        (item) => item.fashion_item_id === fashionItemId
      ) || DUMMY_CLOSET_ITEMS[0]
      set({ selectedItem: dummyItem })
      return dummyItem
    } finally {
      set({ isLoading: false })
    }
  },

  addClothes: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await closetApi.addClothes(data)
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 추가:', error.message)
      const newItem = {
        fashion_item_id: Date.now(),
        ...data,
        wear_cnt: 0,
        is_on_sale: false,
        image_url: 'https://picsum.photos/seed/' + Date.now() + '/300',
      }
      set((state) => ({ items: [...state.items, newItem] }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  updateClothes: async (fashionItemId, data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await closetApi.updateClothes(fashionItemId, data)
      if (response.success) {
        set((state) => ({
          items: state.items.map((item) =>
            item.fashion_item_id === fashionItemId ? { ...item, ...data } : item
          ),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 업데이트:', error.message)
      set((state) => ({
        items: state.items.map((item) =>
          item.fashion_item_id === fashionItemId ? { ...item, ...data } : item
        ),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Local Actions ==========
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  clearError: () => set({ error: null }),

  // ========== Getters ==========
  getFilteredItems: () => {
    const { items, selectedCategory } = get()
    if (selectedCategory === '전체') return items
    return items.filter((item) => item.category === selectedCategory)
  },

  getItemsByCategory: (category) => {
    const { items } = get()
    return items.filter((item) => item.category === category)
  },
}))

export default useClosetStore
