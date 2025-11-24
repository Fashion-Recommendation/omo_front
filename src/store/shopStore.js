import { create } from 'zustand'
import * as shopApi from '../api/shop'

// ========== 더미 데이터 ==========
const DUMMY_SHOP_POSTS = [
  {
    shop_post_id: 310,
    price: 27700,
    status: 'published',
    fashion_item: {
      category: 'outer',
      fashion_item_id: 200,
      name: '네이비 롱코트',
      image_url: 'https://picsum.photos/seed/shop1/300',
      style: 'minimal',
      season: 'winter',
    },
    created_at: '2025-11-23T19:10:22',
  },
  {
    shop_post_id: 311,
    price: 15000,
    status: 'published',
    fashion_item: {
      category: 'bottom',
      fashion_item_id: 102,
      name: '와이드 데님 팬츠',
      image_url: 'https://picsum.photos/seed/shop2/300',
      style: 'casual',
      season: 'all',
    },
    created_at: '2025-11-22T16:13:52',
  },
  {
    shop_post_id: 312,
    price: 35000,
    status: 'published',
    fashion_item: {
      category: 'top',
      fashion_item_id: 150,
      name: '울 니트 스웨터',
      image_url: 'https://picsum.photos/seed/shop3/300',
      style: 'casual',
      season: 'winter',
    },
    created_at: '2025-11-21T11:25:30',
  },
  {
    shop_post_id: 313,
    price: 22000,
    status: 'completed',
    fashion_item: {
      category: 'shoes',
      fashion_item_id: 305,
      name: '블랙 로퍼',
      image_url: 'https://picsum.photos/seed/shop4/300',
      style: 'minimal',
      season: 'all',
    },
    created_at: '2025-11-20T14:42:18',
  },
]

const DUMMY_SHOP_DETAIL = {
  seller: {
    member_id: 42,
    name: '구본엽',
    profile_image_url: 'https://picsum.photos/seed/seller1/100',
  },
  fashion_item: {
    fashion_item_id: 200,
    name: '네이비 롱코트',
    color: 'navy',
    style: 'minimal',
    season: 'winter',
    size: 'L',
    image_url: 'https://picsum.photos/seed/shopdetail/400',
  },
  shop_post_content: {
    shop_post_id: 310,
    content: '한 번도 안 입은 신상이에요!',
    price: 27700,
    status: 'published',
    created_at: '2025-11-23T19:10:22',
  },
}

const useShopStore = create((set, get) => ({
  // ========== State ==========
  posts: DUMMY_SHOP_POSTS,
  selectedPost: null,
  selectedCategory: '전체',
  isLoading: false,
  error: null,

  // ========== API Actions ==========
  fetchAllPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await shopApi.getAllShopPosts()
      set({ posts: response.posts || [] })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ posts: DUMMY_SHOP_POSTS })
      return { posts: DUMMY_SHOP_POSTS }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPostDetail: async (postId) => {
    set({ isLoading: true, error: null })
    try {
      const post = await shopApi.getShopPostDetail(postId)
      set({ selectedPost: post })
      return post
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ selectedPost: DUMMY_SHOP_DETAIL })
      return DUMMY_SHOP_DETAIL
    } finally {
      set({ isLoading: false })
    }
  },

  createPost: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await shopApi.createShopPost(data)
      if (response.success) {
        await get().fetchAllPosts()
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 추가:', error.message)
      const newPost = {
        shop_post_id: Date.now(),
        price: data.price,
        status: 'published',
        fashion_item: {
          fashion_item_id: data.fashion_item_id,
          name: '새 상품',
          image_url: 'https://picsum.photos/seed/' + Date.now() + '/300',
        },
        created_at: new Date().toISOString(),
      }
      set((state) => ({ posts: [newPost, ...state.posts] }))
      return { success: true, message: '등록에 성공하였습니다' }
    } finally {
      set({ isLoading: false })
    }
  },

  updatePost: async (shopPostId, data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await shopApi.updateShopPost(shopPostId, data)
      if (response.success) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.shop_post_id === shopPostId ? { ...post, ...data } : post
          ),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 업데이트:', error.message)
      set((state) => ({
        posts: state.posts.map((post) =>
          post.shop_post_id === shopPostId ? { ...post, ...data } : post
        ),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  deletePost: async (shopPostId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await shopApi.deleteShopPost(shopPostId)
      if (response.success) {
        set((state) => ({
          posts: state.posts.filter((post) => post.shop_post_id !== shopPostId),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 삭제:', error.message)
      set((state) => ({
        posts: state.posts.filter((post) => post.shop_post_id !== shopPostId),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  createOrder: async (shopPostId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await shopApi.createOrder(shopPostId)
      if (response.success) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.shop_post_id === shopPostId
              ? { ...post, status: 'completed' }
              : post
          ),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 구매처리:', error.message)
      set((state) => ({
        posts: state.posts.map((post) =>
          post.shop_post_id === shopPostId
            ? { ...post, status: 'completed' }
            : post
        ),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Local Actions ==========
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  clearError: () => set({ error: null }),

  // ========== Getters ==========
  getFilteredPosts: () => {
    const { posts, selectedCategory } = get()
    if (selectedCategory === '전체') return posts
    return posts.filter(
      (post) => post.fashion_item?.category === selectedCategory
    )
  },

  getAvailablePosts: () => {
    const { posts } = get()
    return posts.filter((post) => post.status === 'published')
  },
}))

export default useShopStore
