import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

// 더미 데이터
const SHOP_DETAIL_DATA = {
  1: {
    id: 1,
    name: '발렌시아가 아디다스 포플린 트랙자켓',
    price: '77,700원',
    mainImage: 'https://via.placeholder.com/429x373',
    username: 'rktclgh',
    postedTime: '1주일 전',
    description:
      '22fw를 지배했던 제품입니다.  간절기에 활용하기에\n훌륭한 아이템으로 많은 사람들이 정보를 물어볼겁니다.\n후회 없으실거에요 ^^\n\n23년 1월에 구매했으며\n상태는 매우 좋습니다.',
    details: [
      { label: '상황', value: '학교' },
      { label: '계절', value: '가을, 봄' },
      { label: '활동', value: '실외' },
      { label: '사이즈', value: 'XL' },
      { label: '스타일', value: '스트릿' },
    ],
    recommendations: [
      { name: '블랙 팬츠', image: 'https://via.placeholder.com/100' },
      { name: '화이트 셔츠', image: 'https://via.placeholder.com/100' },
      { name: '스니커즈', image: 'https://via.placeholder.com/100' },
    ],
    tags: ['#출근', '#포멀'],
  },
}

const ShopDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  const product = SHOP_DETAIL_DATA[id] || SHOP_DETAIL_DATA[1]

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  const handlePurchase = () => {
    console.log('구매하기:', product.price)
  }

  const handleUserClick = () => {
    navigate(`/sns/profile/${product.username}`)
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="shop-detail__content">
        {/* 77샵 로고 헤더 */}
        <div className="shop-detail__header">
          <img src="/77-logo.png" alt="77샵" className="shop-detail__header-logo" />
        </div>

        {/* 메인 이미지 */}
        <div className="shop-detail__main-image">
          <img src={product.mainImage} alt={product.name} />
        </div>

        {/* 사용자 정보 */}
        <div className="shop-detail__user-section">
          <div className="shop-detail__user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <div className="shop-detail__avatar" />
            <span className="shop-detail__username">{product.username}</span>
          </div>
          <time className="shop-detail__posted-time">{product.postedTime}</time>
        </div>

        {/* 상품 설명 */}
        <section className="shop-detail__description">
          <p>{product.description}</p>
        </section>

        {/* 상품 상세 정보 */}
        <section className="shop-detail__details">
          {product.details.map((detail, index) => (
            <div key={index} className="shop-detail__detail-row">
              <span className="shop-detail__detail-label">{detail.label}</span>
              <span className="shop-detail__detail-value">{detail.value}</span>
            </div>
          ))}
        </section>

        {/* AI 추천 섹션 */}
        <section className="shop-detail__recommendations">
          <h2 className="shop-detail__recommendations-title">
            AI가 추천해주는 해당 옷과 잘 어울릴 당신의 옷
          </h2>
          <div className="shop-detail__recommendations-grid">
            {product.recommendations.map((rec, index) => (
              <div key={index} className="shop-detail__recommendation-item">
                <img src={rec.image} alt={rec.name} />
                <p>{rec.name}</p>
              </div>
            ))}
          </div>
          <div className="shop-detail__tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="shop-detail__tag">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 구매 버튼 */}
        <button className="shop-detail__purchase-button" onClick={handlePurchase}>
          {product.price} 구매하기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default ShopDetail
