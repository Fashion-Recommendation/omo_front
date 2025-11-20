import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

// 더미 데이터
const ITEM_DETAIL_DATA = {
  1: {
    id: 1,
    name: '발렌시아가 아디다스 포플린 트랙자켓',
    mainImage: 'https://via.placeholder.com/430x428',
    username: 'rktclgh',
    details: [
      { label: '상황', value: '학교' },
      { label: '계절', value: '가을, 봄' },
      { label: '활동', value: '실외' },
      { label: '사이즈', value: 'XL' },
      { label: '스타일', value: '스트릿' },
    ],
    recommendations: [
      { name: '블랙 아디다스 팬츠', image: 'https://via.placeholder.com/100' },
      { name: '화이트 운동화', image: 'https://via.placeholder.com/100' },
      { name: '데미지드 블루진', image: 'https://via.placeholder.com/100' },
    ],
  },
}

const SnsItemDetail = () => {
  const { postId, itemId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  const item = ITEM_DETAIL_DATA[itemId] || ITEM_DETAIL_DATA[1]

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  const handlePurchase = () => {
    console.log('77샵 구매하러 가기')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="sns-item-detail__content">
        {/* 사용자 정보 */}
        <div className="sns-item-detail__user">
          <div className="sns-item-detail__avatar" />
          <span className="sns-item-detail__username">{item.username}</span>
        </div>

        {/* 메인 이미지 */}
        <div className="sns-item-detail__main-image">
          <img src={item.mainImage} alt={item.name} />
        </div>

        {/* 상품명과 77로고 */}
        <div className="sns-item-detail__title-section">
          <img src="/77-logo.png" alt="77샵" className="sns-item-detail__logo" />
          <h1 className="sns-item-detail__title">{item.name}</h1>
        </div>

        {/* 상품 상세 정보 */}
        <section className="sns-item-detail__details">
          {item.details.map((detail, index) => (
            <div key={index} className="sns-item-detail__detail-row">
              <span className="sns-item-detail__detail-label">{detail.label}</span>
              <span className="sns-item-detail__detail-value">{detail.value}</span>
            </div>
          ))}
        </section>

        {/* AI 추천 섹션 */}
        <section className="sns-item-detail__recommendations">
          <h2 className="sns-item-detail__recommendations-title">
            AI가 추천해주는 해당 옷과 잘 어울릴 당신의 옷
          </h2>
          <div className="sns-item-detail__recommendations-grid">
            {item.recommendations.map((rec, index) => (
              <div key={index} className="sns-item-detail__recommendation-item">
                <img src={rec.image} alt={rec.name} />
                <p>{rec.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 77샵 구매 버튼 */}
        <button className="sns-item-detail__purchase-button" onClick={handlePurchase}>
          77샵 구매하러 가기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default SnsItemDetail
