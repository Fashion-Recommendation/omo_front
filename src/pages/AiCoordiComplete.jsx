import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'

const summaryItems = [
  { label: '상황', value: '출근' },
  { label: '계절', value: '가을' },
  { label: '온도', value: '15℃' },
  { label: '활동', value: '실외' },
]

const recommendedOutfits = [
  {
    title: '브라운 목폴라 니트 + 슬랙스 + 블랙 로퍼',
    tags: '#출근 #포멀',
  },
  {
    title: '브라운 목폴라 니트 + 화이트 와이드 팬츠 + 스타디움 자켓',
    tags: '#데이트 #꾸안꾸',
  },
]

const AiCoordiComplete = () => {
  const handleBack = () => {
    console.log('뒤로가기 예정: 이전 페이지로 이동')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleRecommend = () => {
    console.log('다른 추천 받기 API 호출 예정')
  }

  return (
    <div className="page ai-coordi-complete-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-coordi-complete-page__content">
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

        <button type="button" className="primary-button primary-button--full" onClick={handleRecommend}>
          AI 코디 추천 받기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCoordiComplete

