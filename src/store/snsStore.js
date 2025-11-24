import { create } from 'zustand'
import * as snsApi from '../api/sns'

// ========== 더미 데이터 ==========
const DUMMY_POSTS = [
  {
    sns_post_id: 201,
    member: {
      member_id: 42,
      email: 'fashionista@gmail.com',
      profile_image_url: 'https://picsum.photos/seed/user1/100',
    },
    content: '오늘 학교 데이트룩 코디!',
    post_image_url: 'https://picsum.photos/seed/post1/400/500',
    like_cnt: 128,
    created_at: '2025-11-22T16:32:14',
  },
  {
    sns_post_id: 202,
    member: {
      member_id: 15,
      email: 'style_king@kakao.com',
      profile_image_url: 'https://picsum.photos/seed/user2/100',
    },
    content: '캠퍼스룩 코디 완성',
    post_image_url: 'https://picsum.photos/seed/post2/400/500',
    like_cnt: 90,
    created_at: '2025-11-22T12:10:42',
  },
  {
    sns_post_id: 203,
    member: {
      member_id: 33,
      email: 'minimal_lover@naver.com',
      profile_image_url: 'https://picsum.photos/seed/user3/100',
    },
    content: '미니멀 출근룩 데일리',
    post_image_url: 'https://picsum.photos/seed/post3/400/500',
    like_cnt: 256,
    created_at: '2025-11-21T09:22:11',
  },
]

const DUMMY_USER_PROFILE = {
  email: 'fashionista@gmail.com',
  profile_image_url: 'https://picsum.photos/seed/myprofile/200',
  follower_cnt: 120,
  following_cnt: 85,
  sns_post_cnt: 25,
}

const DUMMY_POST_DETAIL = {
  post: {
    post_id: 201,
    content: '오늘 캠퍼스룩',
    post_image_url: 'https://picsum.photos/seed/postdetail/400/500',
    like_cnt: 128,
    created_at: '2025-11-22T14:21:55',
  },
  member: {
    member_id: 15,
    email: 'fashionista@kakao.com',
    profile_image_url: 'https://picsum.photos/seed/detailuser/100',
  },
  fashion_items: [
    {
      fashion_item_id: 51,
      name: '화이트 니트',
      image_url: 'https://picsum.photos/seed/item1/200',
      is_on_sale: false,
    },
    {
      fashion_item_id: 102,
      name: '블랙 슬랙스',
      image_url: 'https://picsum.photos/seed/item2/200',
      is_on_sale: false,
    },
    {
      fashion_item_id: 200,
      name: '네이비 롱코트',
      image_url: 'https://picsum.photos/seed/item3/200',
      is_on_sale: true,
    },
  ],
}

const useSnsStore = create((set, get) => ({
  // ========== State ==========
  posts: DUMMY_POSTS,
  selectedPost: null,
  userProfile: null,
  userPosts: [],
  isLoading: false,
  error: null,

  // ========== Posts Actions ==========
  fetchAllPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await snsApi.getAllPosts()
      set({ posts: response.sns_posts || [] })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ posts: DUMMY_POSTS })
      return { sns_posts: DUMMY_POSTS }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPostDetail: async (snsPostId) => {
    set({ isLoading: true, error: null })
    try {
      const post = await snsApi.getPostDetail(snsPostId)
      set({ selectedPost: post })
      return post
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ selectedPost: DUMMY_POST_DETAIL })
      return DUMMY_POST_DETAIL
    } finally {
      set({ isLoading: false })
    }
  },

  createPost: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await snsApi.createPost(data)
      if (response.success) {
        await get().fetchAllPosts()
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 추가:', error.message)
      const newPost = {
        sns_post_id: Date.now(),
        member: {
          member_id: 1,
          email: 'me@example.com',
          profile_image_url: 'https://picsum.photos/seed/me/100',
        },
        content: data.content,
        post_image_url: data.post_image_url || 'https://picsum.photos/seed/' + Date.now() + '/400/500',
        like_cnt: 0,
        created_at: new Date().toISOString(),
      }
      set((state) => ({ posts: [newPost, ...state.posts] }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  updatePost: async (snsPostId, data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await snsApi.updatePost(snsPostId, data)
      if (response.success) {
        await get().fetchAllPosts()
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 업데이트:', error.message)
      set((state) => ({
        posts: state.posts.map((post) =>
          post.sns_post_id === snsPostId ? { ...post, ...data } : post
        ),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  deletePost: async (snsPostId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await snsApi.deletePost(snsPostId)
      if (response.success) {
        set((state) => ({
          posts: state.posts.filter((post) => post.sns_post_id !== snsPostId),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 삭제:', error.message)
      set((state) => ({
        posts: state.posts.filter((post) => post.sns_post_id !== snsPostId),
      }))
      return { success: true }
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Like Actions ==========
  likePost: async (snsPostId) => {
    try {
      const response = await snsApi.likePost(snsPostId)
      if (response.success) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.sns_post_id === snsPostId
              ? { ...post, like_cnt: response.like_cnt }
              : post
          ),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 좋아요:', error.message)
      set((state) => ({
        posts: state.posts.map((post) =>
          post.sns_post_id === snsPostId
            ? { ...post, like_cnt: post.like_cnt + 1 }
            : post
        ),
      }))
      return { success: true }
    }
  },

  unlikePost: async (snsPostId) => {
    try {
      const response = await snsApi.unlikePost(snsPostId)
      if (response.success) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.sns_post_id === snsPostId
              ? { ...post, like_cnt: response.like_cnt }
              : post
          ),
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 좋아요 취소:', error.message)
      set((state) => ({
        posts: state.posts.map((post) =>
          post.sns_post_id === snsPostId
            ? { ...post, like_cnt: Math.max(post.like_cnt - 1, 0) }
            : post
        ),
      }))
      return { success: true }
    }
  },

  // ========== Profile Actions ==========
  fetchUserProfile: async (memberId) => {
    set({ isLoading: true, error: null })
    try {
      const profile = await snsApi.getUserProfile(memberId)
      set({ userProfile: profile })
      return profile
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ userProfile: DUMMY_USER_PROFILE })
      return DUMMY_USER_PROFILE
    } finally {
      set({ isLoading: false })
    }
  },

  fetchUserPosts: async (memberId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await snsApi.getUserPosts(memberId)
      set({ userPosts: response.posts || [] })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      const dummyUserPosts = DUMMY_POSTS.slice(0, 2).map((p) => ({
        sns_post_id: p.sns_post_id,
        post_image_url: p.post_image_url,
      }))
      set({ userPosts: dummyUserPosts })
      return { posts: dummyUserPosts }
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Follow Actions ==========
  followUser: async (memberId) => {
    try {
      const response = await snsApi.followUser(memberId)
      if (response.success && get().userProfile) {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            follower_cnt: (state.userProfile.follower_cnt || 0) + 1,
          },
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 팔로우:', error.message)
      if (get().userProfile) {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            follower_cnt: (state.userProfile.follower_cnt || 0) + 1,
          },
        }))
      }
      return { success: true }
    }
  },

  unfollowUser: async (memberId) => {
    try {
      const response = await snsApi.unfollowUser(memberId)
      if (response.success && get().userProfile) {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            follower_cnt: Math.max((state.userProfile.follower_cnt || 1) - 1, 0),
          },
        }))
      }
      return response
    } catch (error) {
      console.warn('API 연결 실패, 로컬 언팔로우:', error.message)
      if (get().userProfile) {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            follower_cnt: Math.max((state.userProfile.follower_cnt || 1) - 1, 0),
          },
        }))
      }
      return { success: true }
    }
  },

  // ========== Local Actions ==========
  setSelectedPost: (post) => set({ selectedPost: post }),
  clearUserProfile: () => set({ userProfile: null, userPosts: [] }),
  clearError: () => set({ error: null }),
}))

export default useSnsStore
