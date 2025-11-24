import client from './client'

// 로그인
export const login = async (loginId) => {
  const response = await client.post('/login', { loginId })
  return response.data
}

// 로그아웃
export const logout = async () => {
  const response = await client.put('/logout')
  return response.data
}
