import client from './client'

// 옷장 옷 목록 조회
export const getClosetItems = async (userId) => {
  const response = await client.get(`/clothes/${userId}/`)
  return response.data
}

// 옷장에 새 옷 등록
export const addClothes = async (data) => {
  const response = await client.post('/clothes/', data)
  return response.data
}

// 개별 의류 정보 조회
export const getClothesDetail = async (fashionItemId) => {
  const response = await client.get(`/clothes/detail/${fashionItemId}/`)
  return response.data
}

// 개별 의류 정보 수정
export const updateClothes = async (fashionItemId, data) => {
  const response = await client.patch(`/clothes/detail/${fashionItemId}/`, data)
  return response.data
}
