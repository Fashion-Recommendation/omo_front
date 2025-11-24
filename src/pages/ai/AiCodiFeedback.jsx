import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

const AiCodiFeedback = () => {
  const navigate = useNavigate()
  const {
    selectedOutfit,
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    evaluateOutfit,
    isLoading
  } = useCodiStore()

  const handleBack = () => navigate(-1)

  const handleGetFeedback = async () => {
    await evaluateOutfit(selectedOutfit)
    navigate('/ai/feedback2')
  }

  const outfitItems = selectedOutfit?.items || []

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">오늘의 코디 신청</h1>
      </div>

      <main className="page__content">
        {/* 오늘의 코디 정보 */}
        <section className="section">
          <h2 className="section__title">오늘의 코디</h2>
          <div className="info-list">
            <div className="info-list__row">
              <span className="info-list__label">상황</span>
              <span className="info-list__value">{selectedSituation || '소개팅'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">계절</span>
              <span className="info-list__value">{season || '겨울'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">온도</span>
              <span className="info-list__value">{temperature || '14도'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">활동</span>
              <span className="info-list__value">{selectedActivity === '실외 활동' ? '실외' : '실내'}</span>
            </div>
          </div>
        </section>

        {/* 이렇게 입을래요 */}
        <section className="section">
          <h2 className="section__title">이렇게 입을래요 !</h2>
          <div className="feedback-outfit-card">
            <div className="feedback-outfit-card__images">
              {outfitItems.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="feedback-outfit-card__thumb"
                  style={{
                    backgroundImage: item?.image_url ? `url(${item.image_url})` : undefined,
                  }}
                />
              ))}
            </div>
            <p className="feedback-outfit-card__description">
              {selectedOutfit?.description || '브라운 목폴라 니트 + 딥블루 파자마 팬츠 + 블랙 크록스'}
            </p>
          </div>
        </section>

        {/* 피드백 받기 버튼 */}
        <button
          className="cta-button"
          onClick={handleGetFeedback}
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : 'AI 코디 피드백 받기'}
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiFeedback
