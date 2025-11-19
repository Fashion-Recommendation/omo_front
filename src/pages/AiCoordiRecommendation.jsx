import { useState } from 'react'

import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'

const situationOptions = ['출근', '데이트', '여행', '학교', '모임', '기타']
const activityOptions = ['실외 활동', '실내 활동']
const seasonOptions = ['봄', '여름', '가을', '겨울']

const AiCoordiRecommendation = () => {
  const [selectedSituation, setSelectedSituation] = useState(situationOptions[0])
  const [season, setSeason] = useState('가을')
  const [temperature, setTemperature] = useState('12')
  const [selectedActivity, setSelectedActivity] = useState(activityOptions[0])

  const handleBack = () => {
    console.log('뒤로가기 예정: 히스토리 이동 또는 라우팅 연결')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleAddClothing = () => {
    console.log('옷 추가 페이지로 이동 예정')
  }

  const handleRecommend = async (event) => {
    event.preventDefault()
    const payload = {
      situation: selectedSituation,
      season,
      temperature: Number(temperature),
      activity: selectedActivity,
    }

    console.log('AI 추천 요청 payload', payload)

    // TODO: 백엔드 API 연동
    // await fetch('/api/coordi/recommendations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
  }

  return (
    <div className="page ai-coordi-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-coordi-page__content">
        <h1 className="ai-coordi-page__title">AI 코디 추천</h1>

        <form className="ai-coordi-page__form" onSubmit={handleRecommend}>
          <section className="card">
            <div className="card__header">
              <h2>기존 옷 선택하기</h2>
              <button type="button" className="text-button" onClick={handleAddClothing}>
                + 옷 추가하기
              </button>
            </div>

            <div className="selected-item">
              <div className="selected-item__thumb" aria-hidden="true" />
              <div>
                <p className="selected-item__name">브라운 목폴라 니트</p>
                <p className="selected-item__hash">#출근 #포멀</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>오늘은 어떤 상황의 코디가 필요한가요?</h2>
            <div className="chip-group">
              {situationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip ${option === selectedSituation ? 'is-active' : ''}`}
                  onClick={() => setSelectedSituation(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>오늘의 날씨는 어떤가요?</h2>
            <div className="select-row">
              <label className="select">
                <span className="select__label">계절</span>
                <select value={season} onChange={(event) => setSeason(event.target.value)}>
                  {seasonOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select">
                <span className="select__label">온도 (℃)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={temperature}
                  onChange={(event) => setTemperature(event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="card">
            <h2>주로 무슨 활동을 하시나요?</h2>
            <div className="chip-group chip-group--wide">
              {activityOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip chip--wide ${option === selectedActivity ? 'is-active' : ''}`}
                  onClick={() => setSelectedActivity(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <button type="submit" className="primary-button">
            AI 코디 추천 받기
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  )
}

export default AiCoordiRecommendation

