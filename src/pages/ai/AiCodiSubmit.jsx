import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useCodiStore from '../../store/useCodiStore'

/** AI 코디 제출하기 페이지 */
const AiCodiSubmit = () => {
  const {
    selectedSituation,
    season,
    temperature,
    selectedActivity,
    recommendedOutfits,
  } = useCodiStore()

  const handleBack = () => {
    console.log('뒤로가기 예정: 이전 페이지로 이동')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleEdit = () => {
    console.log('코디 수정하기 플로우 예정')
  }

  const handleGoOut = () => {
    console.log('입고 외출하기 확정 플로우 예정')
  }

  const summaryItems = [
    { label: '상황', value: selectedSituation },
    { label: '계절', value: season },
    { label: '온도', value: `${temperature}℃` },
    { label: '활동', value: selectedActivity },
  ]

  const todayOutfit = recommendedOutfits[0]

  return (
    <div className="page ai-codi-submit-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-codi-submit-page__content">
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

        {todayOutfit && (
          <section className="card">
            <h2>선택한 코디</h2>
            <div className="outfit-list">
              <article className="outfit-card">
                <div className="outfit-card__thumb" aria-hidden="true" />
                <div className="outfit-card__body">
                  <h3>{todayOutfit.title}</h3>
                  <p>{todayOutfit.tags}</p>
                </div>
              </article>
            </div>
          </section>
        )}

        <div className="dual-button-group">
          <button type="button" className="dual-button dual-button--primary" onClick={handleEdit}>
            코디 수정하기
          </button>
          <button type="button" className="dual-button dual-button--primary" onClick={handleGoOut}>
            입고 외출하기
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCodiSubmit


