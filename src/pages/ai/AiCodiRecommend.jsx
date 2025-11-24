import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'
import useClosetStore from '../../store/closetStore'

const SITUATION_OPTIONS = ['출근', '데이트', '여행', '학교', '모임', '기타']
const SEASON_OPTIONS = ['봄', '여름', '가을', '겨울']
const TEMPERATURE_OPTIONS = ['5도 이하', '5~10도', '10~15도', '15~20도', '20~25도', '25도 이상']
const ACTIVITY_OPTIONS = ['실외 활동', '실내 활동']

const AiCodiRecommend = () => {
  const navigate = useNavigate()
  const {
    baseClothing,
    setBaseClothing,
    selectedSituation,
    setSelectedSituation,
    season,
    setSeason,
    temperature,
    setTemperature,
    selectedActivity,
    setSelectedActivity,
    fetchOutfitRecommendation,
    isLoading,
  } = useCodiStore()

  const { items: closetItems, fetchClosetItems } = useClosetStore()
  const [showClosetModal, setShowClosetModal] = useState(false)

  useEffect(() => {
    if (closetItems.length === 0) {
      fetchClosetItems(1)
    }
  }, [])

  const handleBack = () => navigate(-1)

  const handleSelectClothing = (item) => {
    setBaseClothing(item)
    setShowClosetModal(false)
  }

  const handleRecommend = async () => {
    if (!baseClothing) {
      alert('기준 옷을 선택해주세요')
      return
    }
    await fetchOutfitRecommendation()
    navigate('/ai/recommend2')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">AI 코디 추천</h1>
      </div>

      <main className="page__content">
        {/* 기준 옷 선택하기 */}
        <section className="section">
          <h2 className="section__title">기준 옷 선택하기</h2>

          <button
            className="add-button"
            onClick={() => setShowClosetModal(true)}
          >
            <span className="add-button__icon">+</span>
            <span className="add-button__text">옷 추가하기</span>
          </button>

          {baseClothing && (
            <div className="selected-clothing">
              <div
                className="selected-clothing__image"
                style={{
                  backgroundImage: `url(${baseClothing.image_url})`,
                }}
              />
              <div className="selected-clothing__info">
                <p className="selected-clothing__name">{baseClothing.name}</p>
                <p className="selected-clothing__tags">#{baseClothing.style} #포멀</p>
              </div>
            </div>
          )}
        </section>

        {/* 상황 선택 */}
        <section className="section">
          <h2 className="section__title">오늘은 어떤 상황의 코디가 필요한가요?</h2>
          <div className="chip-group">
            {SITUATION_OPTIONS.map((situation) => (
              <button
                key={situation}
                className={`chip ${selectedSituation === situation ? 'chip--active' : ''}`}
                onClick={() => setSelectedSituation(situation)}
              >
                {situation}
              </button>
            ))}
          </div>
        </section>

        {/* 날씨 선택 */}
        <section className="section">
          <h2 className="section__title">오늘의 날씨는 어떤가요?</h2>
          <div className="select-row">
            <div className="select-box">
              <label className="select-box__label">계절</label>
              <select
                className="select-box__select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                {SEASON_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="select-box">
              <label className="select-box__label">온도</label>
              <select
                className="select-box__select"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              >
                {TEMPERATURE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 활동 선택 */}
        <section className="section">
          <h2 className="section__title">주로 무슨 활동을 하시나요?</h2>
          <div className="toggle-group">
            {ACTIVITY_OPTIONS.map((activity) => (
              <button
                key={activity}
                className={`toggle-button ${selectedActivity === activity ? 'toggle-button--active' : ''}`}
                onClick={() => setSelectedActivity(activity)}
              >
                {activity}
              </button>
            ))}
          </div>
        </section>

        {/* 추천 받기 버튼 */}
        <button
          className="cta-button"
          onClick={handleRecommend}
          disabled={isLoading}
        >
          {isLoading ? '추천 중...' : 'AI 코디 추천 받기'}
        </button>
      </main>

      <BottomNav />

      {/* 옷장 모달 */}
      {showClosetModal && (
        <div className="modal-overlay" onClick={() => setShowClosetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">기준 옷 선택</h3>
              <button className="modal__close" onClick={() => setShowClosetModal(false)}>×</button>
            </div>
            <div className="modal__body">
              <div className="closet-grid">
                {closetItems.map((item) => (
                  <div
                    key={item.fashion_item_id}
                    className={`closet-card ${baseClothing?.fashion_item_id === item.fashion_item_id ? 'closet-card--selected' : ''}`}
                    onClick={() => handleSelectClothing(item)}
                  >
                    <div
                      className="closet-card__image"
                      style={{
                        backgroundImage: `url(${item.image_url})`,
                      }}
                    >
                      {baseClothing?.fashion_item_id === item.fashion_item_id && (
                        <div className="closet-card__check">✓</div>
                      )}
                    </div>
                    <div className="closet-card__info">
                      <p className="closet-card__name">{item.name}</p>
                      <p className="closet-card__tag">#{item.style}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiCodiRecommend
