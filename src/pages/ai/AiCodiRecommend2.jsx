import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

const AiCodiRecommend2 = () => {
  const navigate = useNavigate()
  const {
    baseClothing,
    recommendedOutfit,
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    setSelectedOutfit
  } = useCodiStore()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleBack = () => navigate(-1)

  // 추천 코디 2개 조합 생성
  const outfitCombinations = [
    {
      id: 1,
      items: recommendedOutfit
        ? [baseClothing, recommendedOutfit.bottom, recommendedOutfit.shoes].filter(Boolean)
        : [baseClothing].filter(Boolean),
      description: recommendedOutfit
        ? `${baseClothing?.name || ''} + ${recommendedOutfit.bottom?.name || '슬랙스'} + ${recommendedOutfit.shoes?.name || '블랙 로퍼'}`
        : '브라운 목폴라 니트 + 슬랙스 + 블랙 로퍼',
      tags: '#출근 #포멀',
    },
    {
      id: 2,
      items: recommendedOutfit
        ? [baseClothing, recommendedOutfit.outer, recommendedOutfit.bottom, recommendedOutfit.shoes].filter(Boolean)
        : [baseClothing].filter(Boolean),
      description: recommendedOutfit
        ? `${baseClothing?.name || ''} + ${recommendedOutfit.outer?.name || '화이트 와이드 팬츠'} + ${recommendedOutfit.shoes?.name || '스타디움 자켓'}`
        : '브라운 목폴라 니트 + 화이트 와이드 팬츠 + 스타디움 자켓',
      tags: '#데이트 #꾸안꾸',
    },
  ]

  const handleSelectOutfit = () => {
    setSelectedOutfit(outfitCombinations[selectedIndex])
    navigate('/ai/submit')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">AI 코디 추천</h1>
      </div>

      <main className="page__content">
        {/* 오늘의 코디 정보 */}
        <section className="section">
          <h2 className="section__title">오늘의 코디</h2>
          <div className="info-list">
            <div className="info-list__row">
              <span className="info-list__label">상황</span>
              <span className="info-list__value">{selectedSituation || '출근'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">계절</span>
              <span className="info-list__value">{season || '가을'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">온도</span>
              <span className="info-list__value">{temperature || '15도'}</span>
            </div>
            <div className="info-list__row">
              <span className="info-list__label">활동</span>
              <span className="info-list__value">{selectedActivity === '실외 활동' ? '실외' : '실내'}</span>
            </div>
          </div>
        </section>

        {/* 추천 코디 목록 */}
        <section className="section">
          <h2 className="section__title">추천 코디</h2>
          <div className="outfit-list">
            {outfitCombinations.map((outfit, index) => (
              <div
                key={outfit.id}
                className={`outfit-card ${selectedIndex === index ? 'outfit-card--selected' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="outfit-card__images">
                  {outfit.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="outfit-card__thumb"
                      style={{
                        backgroundImage: item?.image_url ? `url(${item.image_url})` : undefined,
                      }}
                    />
                  ))}
                </div>
                <p className="outfit-card__description">{outfit.description}</p>
                <p className="outfit-card__tags">{outfit.tags}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 선택 버튼 */}
        <button className="cta-button" onClick={handleSelectOutfit}>
          코디 선택하기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiRecommend2
