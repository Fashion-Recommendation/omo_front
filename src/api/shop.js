import client from './client'

// 전체 77샵 게시물 조회
export const getAllShopPosts = async () => {
  const response = await client.get('/shop/posts')
  return response.data
}

// 77샵 게시글 상세정보 조회
export const getShopPostDetail = async (postId) => {
  const response = await client.get(`/shop/posts/${postId}`)
  return response.data
}

// 77샵 게시글 등록
export const createShopPost = async (data) => {
  const response = await client.post('/shop/posts', data)
  return response.data
}

// 77샵 게시글 수정
export const updateShopPost = async (shopPostId, data) => {
  const response = await client.patch(`/shop/posts/${shopPostId}`, data)
  return response.data
}

// 77샵 게시글 삭제
export const deleteShopPost = async (shopPostId) => {
  const response = await client.delete(`/shop/posts/${shopPostId}`)
  return response.data
}

// 77샵 구매 신청
export const createOrder = async (shopPostId) => {
  const response = await client.post('/shop/orders', { shop_post_id: shopPostId })
  return response.data
}
