import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

/** AI 코디 추천 결과 (타입 2) */
const AiCodiComplete2 = () => {
  const {
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    recommendedOutfits,
    baseClothing,
  } = useCodiStore()

  const handleBack = () => {
    console.log('뒤로가기 예정: 이전 페이지로 이동')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleRetry = () => {
    console.log('AI 추천 재요청 예정')
  }

  const handleSelect = () => {
    console.log('선택한 코디 확정 예정')
  }

  const summaryMessage = `${baseClothing.name}은 좋은 선택이지만 ${selectedSituation} 상황에는 조금 더 단정한 조합을 추천드려요!`

  return (
    <div className="page ai-codi-complete2-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-codi-complete2-page__content">
        <section className="card">
          <h2>AI 코디 피드백</h2>
          <p className="feedback-note">
            {summaryMessage}
            <br />
            {`${season} / ${temperature}℃ / ${selectedActivity}`}
          </p>
        </section>

        <section className="card">
          <h2>추천 코디</h2>
          <div className="outfit-list">
            {recommendedOutfits.map((outfit) => (
              <article className="outfit-card" key={outfit.title}>
                <div className="outfit-card__thumb" aria-hidden="true" />
                <div className="outfit-card__body">
                  <h3>{outfit.title}</h3>
                  <p>{outfit.tags}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="dual-button-group">
          <button type="button" className="dual-button dual-button--secondary" onClick={handleRetry}>
            한번 더 받기
          </button>
          <button type="button" className="dual-button dual-button--primary" onClick={handleSelect}>
            선택한 코디로 외출하기
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiComplete2

