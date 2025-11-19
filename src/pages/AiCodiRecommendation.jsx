import { useMemo } from 'react'

import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import useCodiStore from '../store/useCodiStore'

/** AI 옷 기준 추천 페이지 */
const AiCodiRecommendation = () => {
  const {
    situationOptions,
    activityOptions,
    seasonOptions,
    selectedSituation,
    selectedActivity,
    season,
    temperature,
    baseClothing,
    setSelectedSituation,
    setSelectedActivity,
    setSeason,
    setTemperature,
  } = useCodiStore()

  const handleBack = () => {
    console.log('뒤로가기 예정: 히스토리 이동 또는 라우팅 연결')
  }

  const handleProfile = () => {
    console.log('프로필 페이지로 이동 예정')
  }

  const handleAddClothing = () => {
    console.log('옷 추가 페이지로 이동 예정')
  }

  const payload = useMemo(
    () => ({
      situation: selectedSituation,
      season,
      temperature: Number(temperature),
      activity: selectedActivity,
    }),
    [selectedSituation, season, temperature, selectedActivity],
  )

  const handleRecommend = async (event) => {
    event.preventDefault()
    console.log('AI 추천 요청 payload', payload)

    // TODO: 백엔드 API 연동
    // await fetch('/api/coordi/recommendations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
  }

  return (
    <div className="page ai-codi-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="ai-codi-page__content">
        <h1 className="ai-codi-page__title">AI 코디 추천</h1>

        <form className="ai-codi-page__form" onSubmit={handleRecommend}>
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
                <p className="selected-item__name">{baseClothing.name}</p>
                <p className="selected-item__hash">{baseClothing.tags}</p>
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

export default AiCodiRecommendation

