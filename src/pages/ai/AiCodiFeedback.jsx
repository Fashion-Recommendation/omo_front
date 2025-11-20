import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

/** AI 코디 피드백 페이지 */
const AiCodiFeedback = () => {
  const {
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    featuredOutfit,
  } = useCodiStore()

  const handleBack = () => {
    console.log('뒤로가기 예정: 이전 페이지로 이동')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleFeedback = () => {
    console.log('AI 피드백 API 호출 예정')
  }

  const summaryItems = [
    { label: '상황', value: selectedSituation },
    { label: '계절', value: season },
    { label: '온도', value: `${temperature}℃` },
    { label: '활동', value: selectedActivity },
  ]

  return (
    <div className="page ai-codi-feedback-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-codi-feedback-page__content">
        <section className="card">
          <h2>오늘의 코디</h2>
          <dl className="summary-list">
            {summaryItems.map((item) => (
              <div className="summary-list__row" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="card">
          <h2>이렇게 입을래요!</h2>
          <article className="feedback-hero">
            {featuredOutfit.imageUrl ? (
              <img src={featuredOutfit.imageUrl} alt={featuredOutfit.title} />
            ) : (
              <div className="feedback-hero__placeholder" aria-hidden="true" />
            )}
            <div className="feedback-hero__body">
              <h3>{featuredOutfit.title}</h3>
              <p>{featuredOutfit.description}</p>
            </div>
          </article>
        </section>

        <button type="button" className="primary-button primary-button--full" onClick={handleFeedback}>
          AI 코디 피드백 받기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiFeedback

