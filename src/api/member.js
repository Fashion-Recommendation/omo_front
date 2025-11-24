import client from './client'

// 내 정보 조회
export const getMyInfo = async () => {
  const response = await client.get('/members/me')
  return response.data
}

// 내 정보 수정
export const updateMyInfo = async (data) => {
  const response = await client.patch('/members/me', data)
  return response.data
}

// 코디 내역 조회
export const getFashionHistory = async () => {
  const response = await client.get('/fashion_history/me')
  return response.data
}

// 옷 입고 나가기 (코디 기록 저장)
export const saveFashionHistory = async (data) => {
  const response = await client.post('/fashion_history', data)
  return response.data
}
