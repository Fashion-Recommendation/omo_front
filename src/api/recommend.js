import client from './client'

// 기준 아이템 + TPO로 코디 추천 (내 옷장 기준)
export const getOutfitRecommendation = async (fashionItemId, tpo) => {
  const response = await client.post('/recommend/outfits', {
    fashion_item_id: fashionItemId,
    tpo,
  })
  return response.data
}

// 특정 옷 파츠에 대한 최적의 옷 조합 요청 (77샵, SNS 기준)
export const getItemRecommendation = async (fashionItemId) => {
  const response = await client.get(`/recommend/items/${fashionItemId}`)
  return response.data
}

// 코디 조합 피드백 받기
export const evaluateOutfit = async (outfit, tpo) => {
  const response = await client.post('/recommend/outfits/evaluate', {
    outfit,
    tpo,
  })
  return response.data
}
