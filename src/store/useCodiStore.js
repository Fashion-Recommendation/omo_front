import { create } from 'zustand'

// MOCK_DATA: 기본 상황/계절/활동 옵션
const mockSituationOptions = ['출근', '데이트', '여행', '학교', '모임', '기타']
const mockActivityOptions = ['실외 활동', '실내 활동']
const mockSeasonOptions = ['봄', '여름', '가을', '겨울']

// MOCK_DATA: 추천 결과 및 선택한 옷 정보
const mockBaseClothing = {
  name: '브라운 목폴라 니트',
  tags: '#출근 #포멀',
  imageUrl: null,
}

const mockRecommendedOutfits = [
  {
    title: '브라운 목폴라 니트 + 슬랙스 + 블랙 로퍼',
    tags: '#출근 #포멀',
  },
  {
    title: '브라운 목폴라 니트 + 화이트 와이드 팬츠 + 스타디움 자켓',
    tags: '#데이트 #꾸안꾸',
  },
]

// MOCK_DATA: 피드백용 대표 코디
const mockFeaturedOutfit = {
  title: '브라운 목폴라 니트 + 딥블루 팬츠 + 블랙 크록스',
  description: '톤온톤 상의에 대비되는 팬츠로 포인트를 주고, 편안한 슈즈로 활동성을 살렸어요.',
  imageUrl: null,
}

const useCodiStore = create((set) => ({
  situationOptions: mockSituationOptions,
  activityOptions: mockActivityOptions,
  seasonOptions: mockSeasonOptions,
  baseClothing: mockBaseClothing,
  recommendedOutfits: mockRecommendedOutfits,
  featuredOutfit: mockFeaturedOutfit,
  selectedSituation: mockSituationOptions[0],
  selectedActivity: mockActivityOptions[0],
  season: '가을',
  temperature: '15',

  setSelectedSituation: (value) => set({ selectedSituation: value }),
  setSelectedActivity: (value) => set({ selectedActivity: value }),
  setSeason: (value) => set({ season: value }),
  setTemperature: (value) => set({ temperature: value }),
  setBaseClothing: (clothing) => set({ baseClothing: clothing }),
  setRecommendedOutfits: (outfits) => set({ recommendedOutfits: outfits }),
  setFeaturedOutfit: (outfit) => set({ featuredOutfit: outfit }),
}))

export default useCodiStore

