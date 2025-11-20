import React from 'react'
import { useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

// 더미 데이터 (나중에 Zustand로 대체)
const CLOTHING_DATA = {
  1: {
    id: 1,
    title: '발렌시아가 아디다스 포플린 트랙자켓',
    image: 'https://via.placeholder.com/430x430',
    details: [
      { label: '상황', value: '학교' },
      { label: '계절', value: '가을, 봄' },
      { label: '활동', value: '실외' },
      { label: '사이즈', value: 'XL' },
      { label: '착용횟수', value: '12' },
      { label: '스타일', value: '스트릿' },
    ],
  },
  2: {
    id: 2,
    title: '블랙 포플린 자켓',
    image: 'https://via.placeholder.com/430x430',
    details: [
      { label: '상황', value: '데일리' },
      { label: '계절', value: '봄, 가을' },
      { label: '활동', value: '실외' },
      { label: '사이즈', value: 'L' },
      { label: '착용횟수', value: '12' },
      { label: '스타일', value: '스트릿' },
    ],
  },
}

const ClosetDetail = () => {
  const { id } = useParams()
  const item = CLOTHING_DATA[id] || CLOTHING_DATA[1]

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    console.log('프로필로 이동')
  }

  const handleRecommend = () => {
    console.log('코디 추천 받기')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} title="내 옷장" />

      <main className="closet-detail__content">
        {/* 상품 이미지 */}
        <div className="closet-detail__image">
          <img src={item.image} alt={item.title} />
        </div>

        {/* 상품명 */}
        <h1 className="closet-detail__title">{item.title}</h1>

        {/* 상품 정보 */}
        <section className="closet-detail__info">
          {item.details.map((detail, index) => (
            <div key={index} className="info-row">
              <span className="info-label">{detail.label}</span>
              <span className="info-value">{detail.value}</span>
            </div>
          ))}
        </section>

        {/* 코디 추천 받기 버튼 */}
        <button className="primary-button closet-detail__button" onClick={handleRecommend}>
          코디 추천 받기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default ClosetDetail
