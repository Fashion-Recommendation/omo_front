import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

const AiCodiFeedback2 = () => {
  const navigate = useNavigate()
  const {
    feedbackResult,
    baseClothing,
    recommendedOutfit,
    setSelectedOutfit
  } = useCodiStore()

  const handleBack = () => navigate(-1)

  const handleRetry = () => {
    navigate('/ai/feedback')
  }

  const handleGoToCoordination = () => {
    // 첫 번째 추천 코디 선택
    if (outfitRecommendations.length > 0) {
      setSelectedOutfit(outfitRecommendations[0])
    }
    navigate('/ai/submit')
  }

  // 추천 코디 2개 생성
  const outfitRecommendations = [
    {
      id: 1,
      items: recommendedOutfit
        ? [baseClothing, recommendedOutfit.bottom, recommendedOutfit.shoes].filter(Boolean)
        : [],
      description: '브라운 목폴라 니트 + 슬랙스 + 블랙 로퍼',
      tags: '#출근 #포멀',
    },
    {
      id: 2,
      items: recommendedOutfit
        ? [baseClothing, recommendedOutfit.outer, recommendedOutfit.bottom, recommendedOutfit.shoes].filter(Boolean)
        : [],
      description: '브라운 목폴라 니트 + 화이트 와이드 팬츠 + 스타디움 자켓',
      tags: '#데이트 #꾸안꾸',
    },
  ]

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">AI 코디 피드백</h1>
      </div>

      <main className="page__content">
        {/* AI 피드백 코멘트 */}
        <section className="section">
          <h2 className="section__title">AI 코디 피드백</h2>
          <div className="feedback-comment">
            <p>
              {feedbackResult?.comment ||
                '브라운 목폴라 니트는 아주 좋은 선택이지만, 소개팅이라는 상황을 감안했을때는 조금 더 깔끔하고 단정한 조합을 추천드려요!'}
            </p>
          </div>
        </section>

        {/* 추천 코디 */}
        <section className="section">
          <h2 className="section__title">추천 코디</h2>
          <div className="outfit-list">
            {outfitRecommendations.map((outfit) => (
              <div key={outfit.id} className="outfit-card">
                <div className="outfit-card__images">
                  {outfit.items.length > 0 ? (
                    outfit.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="outfit-card__thumb"
                        style={{
                          backgroundImage: item?.image_url ? `url(${item.image_url})` : undefined,
                        }}
                      />
                    ))
                  ) : (
                    <>
                      <div className="outfit-card__thumb" />
                      <div className="outfit-card__thumb" />
                      <div className="outfit-card__thumb" />
                    </>
                  )}
                </div>
                <p className="outfit-card__description">{outfit.description}</p>
                <p className="outfit-card__tags">{outfit.tags}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 버튼 그룹 */}
        <div className="button-group button-group--feedback">
          <button className="cta-button cta-button--red" onClick={handleRetry}>
            다시 받기
          </button>
          <button className="cta-button" onClick={handleGoToCoordination}>
            코디 하러가기
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiFeedback2
