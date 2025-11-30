import { create } from 'zustand'
import * as snsApi from '../api/sns'

const useSnsStore = create((set) => ({
  posts: [],
  profile: null,
  isLoading: false,
  error: null,
  postDetail: null,
  detailLoading: false,
  detailError: null,
  profileLoading: false,
  profileError: null,
  closetLoading: false,
  closetError: null,


  fetchSnsPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await snsApi.getAllPosts()

      // 백엔드 → 프론트 구조로 변환
      const formatted = data.map((post) => ({
        id: post.id,
        username: post.member_info.username,
        profileImage: post.member_info.profile_image_url,
        Image: post.post_image_url,  
        content: post.content,
        like_cnt: post.like_cnt,
      }))

      set({ posts: formatted })
    } catch (err) {
      set({ error: err.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPostDetail: async (snsPostId) => {
    set({ detailLoading: true, detailError: null });
    try {
      const data = await snsApi.getPostDetail(snsPostId);
      const mapped = {
        id: data.id,
        content: data.content,
        image: data.post_image_url,
        likeCnt: data.like_cnt,
        createdAt: data.created_at,
        member: {
          id: data.member_info.id,
          username: data.member_info.username,
          profileImage: data.member_info.profile_image_url,
        },
        items: data.fashion_items.map(({ fashion_item }) => ({
          id: fashion_item.id,
          name: fashion_item.name,
          category: fashion_item.category,
          isOnSale: fashion_item.is_on_sale,
          image: fashion_item.image_url,
        })),
      };
      set({ postDetail: mapped });
      return mapped;
    } catch (err) {
      set({ detailError: err.message });
      throw err;
    } finally {
      set({ detailLoading: false });
    }
  },

  fetchProfileAndPosts: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const [profile, posts] = await Promise.all([
        snsApi.getUserProfile(userId), // GET /sns/:id
        snsApi.getUserPosts(userId),   // GET /sns/:id/posts
      ]);

      const mappedPosts = posts.map((p) => ({
        id: p.id,
        image: p.post_image_url,
      }));

      set({ profile, posts: mappedPosts });
      return { profile, posts: mappedPosts };
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProfile: async (userId) => {
  set({ profileLoading: true, profileError: null });
  try {
    const profile = await snsApi.getUserProfile(userId);
    set({ profile });
    return { profile };
  } catch (err) {
    set({ profileError: err.message });
    throw err;
  } finally {
    set({ profileLoading: false });
  }
  },

  fetchUserCloset: async (userId) => {
    set({ closetLoading: true, closetError: null });
    try {
      const data = await snsApi.getUserCloset(userId);
      const mapped = data.map((item) => ({
        id: item.id,
        category: item.category,
        image: item.image_url,
      }));
      set({ closet: mapped });
      return mapped;
    } catch (err) {
      set({ closetError: err.message }); throw err;
    } finally { set({ closetLoading: false }); }
  },
}))

export default useSnsStore
