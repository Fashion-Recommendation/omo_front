import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

// 더미 데이터
const ITEM_INFO_DATA = {
  2: {
    id: 2,
    name: '아오이로 더블니',
    mainImage: 'https://via.placeholder.com/430x428',
    username: 'rktclgh',
    details: [
      { label: '상황', value: '학교' },
      { label: '계절', value: '가을, 봄' },
      { label: '활동', value: '실외' },
      { label: '사이즈', value: 'L' },
      { label: '스타일', value: '캐주얼' },
    ],
    recommendations: [
      { name: '화이트 티셔츠', image: 'https://via.placeholder.com/100' },
      { name: '베이지 스니커즈', image: 'https://via.placeholder.com/100' },
      { name: '블랙 캡모자', image: 'https://via.placeholder.com/100' },
    ],
  },
  3: {
    id: 3,
    name: '버켄스탁 보스톤',
    mainImage: 'https://via.placeholder.com/430x428',
    username: 'rktclgh',
    details: [
      { label: '상황', value: '데일리' },
      { label: '계절', value: '사계절' },
      { label: '활동', value: '실내외' },
      { label: '사이즈', value: '270' },
      { label: '스타일', value: '미니멀' },
    ],
    recommendations: [
      { name: '베이지 치노팬츠', image: 'https://via.placeholder.com/100' },
      { name: '화이트 셔츠', image: 'https://via.placeholder.com/100' },
      { name: '브라운 벨트', image: 'https://via.placeholder.com/100' },
    ],
  },
}

const SnsItemInfo = () => {
  const { postId, itemId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  const item = ITEM_INFO_DATA[itemId] || ITEM_INFO_DATA[2]

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="sns-item-info__content">
        {/* 사용자 정보 */}
        <div className="sns-item-info__user">
          <div className="sns-item-info__avatar" />
          <span className="sns-item-info__username">{item.username}</span>
        </div>

        {/* 메인 이미지 */}
        <div className="sns-item-info__main-image">
          <img src={item.mainImage} alt={item.name} />
        </div>

        {/* 상품명 */}
        <h1 className="sns-item-info__title">{item.name}</h1>

        {/* 상품 상세 정보 */}
        <section className="sns-item-info__details">
          {item.details.map((detail, index) => (
            <div key={index} className="sns-item-info__detail-row">
              <span className="sns-item-info__detail-label">{detail.label}</span>
              <span className="sns-item-info__detail-value">{detail.value}</span>
            </div>
          ))}
        </section>

        {/* AI 추천 섹션 */}
        <section className="sns-item-info__recommendations">
          <h2 className="sns-item-info__recommendations-title">
            AI가 추천해주는 해당 옷과 잘 어울릴 당신의 옷
          </h2>
          <div className="sns-item-info__recommendations-grid">
            {item.recommendations.map((rec, index) => (
              <div key={index} className="sns-item-info__recommendation-item">
                <img src={rec.image} alt={rec.name} />
                <p>{rec.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default SnsItemInfo
