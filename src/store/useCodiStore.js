import { create } from 'zustand'
import * as recommendApi from '../api/recommend'

// ========== 더미 데이터 ==========
const DUMMY_RECOMMENDED_OUTFIT = {
  outer: {
    fashion_item_id: 200,
    name: '블랙 패딩 점퍼',
    image_url: 'https://picsum.photos/seed/outer1/200',
  },
  top: {
    fashion_item_id: 51,
    name: '화이트 니트',
    image_url: 'https://picsum.photos/seed/top1/200',
  },
  bottom: {
    fashion_item_id: 102,
    name: '와이드 데님 팬츠',
    image_url: 'https://picsum.photos/seed/bottom1/200',
  },
  shoes: {
    fashion_item_id: 305,
    name: '화이트 운동화',
    image_url: 'https://picsum.photos/seed/shoes1/200',
  },
}

const DUMMY_TPO_RESULT = {
  season: 'winter',
  place: 'school',
  score: 0.91,
}

const DUMMY_FEEDBACK_RESULT = {
  score: 83,
  comment: '데이트룩으로 적당히 캐주얼하면서도 깔끔하지만 패딩을 코트로 바꾸면 더 좋을 것 같아요!',
  improvement_suggestions: [
    {
      outer: {
        fashion_item_id: 220,
        name: '네이비 롱코트',
        image_url: 'https://picsum.photos/seed/suggest1/200',
      },
    },
    {
      accessory: {
        fashion_item_id: 901,
        name: '화이트 머플러',
        image_url: 'https://picsum.photos/seed/suggest2/200',
      },
    },
    {
      shoes: {
        fashion_item_id: 312,
        name: '블랙 로퍼',
        image_url: 'https://picsum.photos/seed/suggest3/200',
      },
    },
  ],
}

const DUMMY_BASE_CLOTHING = {
  fashion_item_id: 105,
  name: '브라운 목폴라 니트',
  category: 'top',
  image_url: 'https://picsum.photos/seed/base1/200',
}

const useCodiStore = create((set, get) => ({
  // ========== State ==========
  // TPO 옵션
  situationOptions: ['출근', '데이트', '여행', '학교', '모임', '기타'],
  activityOptions: ['실외 활동', '실내 활동'],
  seasonOptions: ['봄', '여름', '가을', '겨울'],

  // 선택된 TPO
  selectedSituation: '출근',
  selectedActivity: '실외 활동',
  season: '가을',
  temperature: '15',

  // 기준 옷 (사용자가 선택한 옷)
  baseClothing: null,

  // AI 추천 결과
  recommendedOutfit: null,
  tpoResult: null,

  // 선택된 코디 (AiCodiRecommend2 → AiCodiSubmit 전달용)
  selectedOutfit: null,

  // 피드백 결과
  feedbackResult: null,

  // 로딩/에러 상태
  isLoading: false,
  error: null,

  // ========== API Actions ==========
  // 기준 아이템 + TPO로 코디 추천 받기
  fetchOutfitRecommendation: async () => {
    const { baseClothing, season, selectedSituation } = get()
    if (!baseClothing?.fashion_item_id) {
      set({ error: '기준 옷을 선택해주세요' })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const response = await recommendApi.getOutfitRecommendation(
        baseClothing.fashion_item_id,
        {
          season: season.toLowerCase(),
          place: selectedSituation,
        }
      )
      set({
        recommendedOutfit: response.recommended_outfit,
        tpoResult: response.tpo_result,
      })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({
        recommendedOutfit: DUMMY_RECOMMENDED_OUTFIT,
        tpoResult: DUMMY_TPO_RESULT,
      })
      return {
        recommended_outfit: DUMMY_RECOMMENDED_OUTFIT,
        tpo_result: DUMMY_TPO_RESULT,
      }
    } finally {
      set({ isLoading: false })
    }
  },

  // 특정 옷에 대한 최적의 조합 추천 (77샵, SNS 기준)
  fetchItemRecommendation: async (fashionItemId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await recommendApi.getItemRecommendation(fashionItemId)
      set({ recommendedOutfit: response.recommended_outfit })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ recommendedOutfit: DUMMY_RECOMMENDED_OUTFIT })
      return { recommended_outfit: DUMMY_RECOMMENDED_OUTFIT }
    } finally {
      set({ isLoading: false })
    }
  },

  // 코디 피드백 받기
  evaluateOutfit: async (outfit) => {
    const { season, selectedSituation } = get()

    set({ isLoading: true, error: null })
    try {
      const response = await recommendApi.evaluateOutfit(outfit, {
        season: season.toLowerCase(),
        place: selectedSituation,
      })
      set({ feedbackResult: response })
      return response
    } catch (error) {
      console.warn('API 연결 실패, 더미 데이터 사용:', error.message)
      set({ feedbackResult: DUMMY_FEEDBACK_RESULT })
      return DUMMY_FEEDBACK_RESULT
    } finally {
      set({ isLoading: false })
    }
  },

  // 코디 히스토리 저장
  saveFashionHistoryToServer: async (outfitData) => {
    set({ isLoading: true, error: null })
    try {
      // API 연결시 실제 저장 로직
      console.log('코디 저장:', outfitData)
      // await memberApi.saveFashionHistory(outfitData)
      return { success: true }
    } catch (error) {
      console.warn('저장 실패:', error.message)
      return { success: true } // 더미 모드에서도 성공 처리
    } finally {
      set({ isLoading: false })
    }
  },

  // ========== Local Actions ==========
  setSelectedSituation: (value) => set({ selectedSituation: value }),
  setSelectedActivity: (value) => set({ selectedActivity: value }),
  setSeason: (value) => set({ season: value }),
  setTemperature: (value) => set({ temperature: value }),
  setBaseClothing: (clothing) => set({ baseClothing: clothing }),
  setRecommendedOutfit: (outfit) => set({ recommendedOutfit: outfit }),
  setSelectedOutfit: (outfit) => set({ selectedOutfit: outfit }),
  clearError: () => set({ error: null }),

  // 추천 결과 초기화
  resetRecommendation: () =>
    set({
      recommendedOutfit: null,
      tpoResult: null,
      feedbackResult: null,
    }),

  // 전체 초기화
  resetAll: () =>
    set({
      baseClothing: null,
      recommendedOutfit: null,
      selectedOutfit: null,
      tpoResult: null,
      feedbackResult: null,
      selectedSituation: '출근',
      selectedActivity: '실외 활동',
      season: '가을',
      temperature: '15',
    }),

  // ========== Getters ==========
  getTpoData: () => {
    const { season, selectedSituation } = get()
    return {
      season: season.toLowerCase(),
      place: selectedSituation,
    }
  },
}))

export default useCodiStore
