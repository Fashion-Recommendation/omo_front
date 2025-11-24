import client from './client'

// 전체 SNS 게시글 조회
export const getAllPosts = async () => {
  const response = await client.get('/sns/posts')
  return response.data
}

// 유저 SNS 프로필 조회
export const getUserProfile = async (memberId) => {
  const response = await client.get(`/sns/${memberId}`)
  return response.data
}

// 유저 게시글 목록 조회
export const getUserPosts = async (memberId) => {
  const response = await client.get(`/sns/posts/${memberId}`)
  return response.data
}

// SNS 게시글 상세조회
export const getPostDetail = async (snsPostId) => {
  const response = await client.get(`/sns/posts/${snsPostId}`)
  return response.data
}

// 유저 게시글 등록
export const createPost = async (data) => {
  const response = await client.post('/sns/posts', data)
  return response.data
}

// 유저 게시글 수정
export const updatePost = async (snsPostId, data) => {
  const response = await client.patch(`/sns/posts?post_id=${snsPostId}`, data)
  return response.data
}

// 유저 게시글 삭제
export const deletePost = async (snsPostId) => {
  const response = await client.delete(`/sns/posts?post_id=${snsPostId}`)
  return response.data
}

// 게시글 좋아요
export const likePost = async (snsPostId) => {
  const response = await client.post(`/sns/posts/${snsPostId}/like`)
  return response.data
}

// 게시글 좋아요 취소
export const unlikePost = async (snsPostId) => {
  const response = await client.delete(`/sns/posts/${snsPostId}/like`)
  return response.data
}

// 팔로우 신청
export const followUser = async (memberId) => {
  const response = await client.post(`/sns/follow/${memberId}`)
  return response.data
}

// 팔로우 취소
export const unfollowUser = async (memberId) => {
  const response = await client.delete(`/sns/follow/${memberId}`)
  return response.data
}
