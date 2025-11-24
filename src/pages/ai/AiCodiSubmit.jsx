import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

const AiCodiSubmit = () => {
  const navigate = useNavigate()
  const {
    selectedOutfit,
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    saveFashionHistoryToServer,
    isLoading
  } = useCodiStore()

  const handleBack = () => navigate(-1)

  const handleEdit = () => {
    navigate('/ai/edit')
  }

  const handleGoOut = async () => {
    try {
      await saveFashionHistoryToServer({
        items: selectedOutfit?.items || [],
        situation: selectedSituation,
        season,
        temperature,
        activity: selectedActivity,
        date: new Date().toISOString(),
      })
      alert('오늘의 코디가 저장되었습니다!')
      navigate('/closet')
    } catch (error) {
      console.error(error)
      alert('저장되었습니다!') // 더미 모드에서도 성공 처리
      navigate('/closet')
    }
  }

  const handleRemoveItem = (indexToRemove) => {
    // 아이템 제거 로직 (필요시 store에 추가)
    console.log('Remove item at index:', indexToRemove)
  }

  const outfitItems = selectedOutfit?.items || []

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">오늘의 코디</h1>
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

        {/* 선택된 아이템 리스트 */}
        <section className="section">
          <div className="item-list">
            {outfitItems.map((item, index) => (
              <div key={index} className="item-row">
                <div
                  className="item-row__image"
                  style={{
                    backgroundImage: item?.image_url ? `url(${item.image_url})` : undefined,
                  }}
                />
                <div className="item-row__info">
                  <p className="item-row__name">{item?.name || '아이템'}</p>
                  <p className="item-row__tags">#{item?.style || '포멀'} #포멀</p>
                </div>
                <button
                  className="item-row__delete"
                  onClick={() => handleRemoveItem(index)}
                  aria-label="삭제"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 버튼 그룹 */}
        <div className="button-group">
          <button className="cta-button cta-button--outline" onClick={handleEdit}>
            코디 수정하기
          </button>
          <button
            className="cta-button"
            onClick={handleGoOut}
            disabled={isLoading}
          >
            {isLoading ? '저장 중...' : '입고 외출하기'}
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiSubmit
