import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

const ShopSell = () => {
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  const [formData, setFormData] = useState({
    name: '발렌시아가 아디다스 포플린 트랙자켓',
    description:
      '22fw를 지배했던 제품입니다.  간절기에 활용하기에\n훌륭한 아이템으로 많은 사람들이 정보를 물어볼겁니다.\n후회 없으실거에요 ^^\n\n23년 1월에 구매했으며\n상태는 매우 좋습니다.',
    price: '7,700',
    situation: '학교',
    season: '가을, 봄',
    activity: '실외',
    size: 'XL',
    style: '스트릿',
    image: 'https://via.placeholder.com/427x386',
  })

  const productDetails = [
    { label: '상황', key: 'situation' },
    { label: '계절', key: 'season' },
    { label: '활동', key: 'activity' },
    { label: '사이즈', key: 'size' },
    { label: '스타일', key: 'style' },
  ]

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  const handleImageUpload = () => {
    console.log('이미지 업로드')
  }

  const handleCancel = () => {
    navigate('/shop')
  }

  const handleSubmit = () => {
    console.log('판매 등록:', formData)
    // API 호출 후 shop 페이지로 이동
    navigate('/shop')
  }

  const handlePriceChange = (e) => {
    setFormData({ ...formData, price: e.target.value })
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="shop-sell__content">
        {/* 77샵 로고 헤더 */}
        <div className="shop-sell__header">
          <img src="/77-logo.png" alt="77샵" className="shop-sell__header-logo" />
        </div>

        {/* 이미지 업로드 */}
        <button className="shop-sell__image-upload" onClick={handleImageUpload}>
          <span className="shop-sell__image-upload-icon">+</span>
          <span className="shop-sell__image-upload-text">판매할 옷 첨부하기</span>
        </button>

        {/* 미리보기 이미지 */}
        <div className="shop-sell__preview-image">
          <img src={formData.image} alt="상품 미리보기" />
        </div>

        {/* 상품명 */}
        <section className="shop-sell__section">
          <h2 className="shop-sell__section-title">판매 정보</h2>
          <div className="shop-sell__product-name">
            <h3>{formData.name}</h3>
          </div>
        </section>

        {/* 상품 설명 */}
        <section className="shop-sell__description-section">
          <div className="shop-sell__description-box">
            <p>{formData.description}</p>
          </div>
        </section>

        {/* 가격 */}
        <section className="shop-sell__price-section">
          <h2 className="shop-sell__section-title">가격</h2>
          <div className="shop-sell__price-input-wrapper">
            <input
              type="text"
              className="shop-sell__price-input"
              value={formData.price}
              onChange={handlePriceChange}
              placeholder="가격을 입력하세요"
            />
            <div className="shop-sell__price-display">
              <span className="shop-sell__price-value">{formData.price}</span>
              <span className="shop-sell__price-unit">원</span>
            </div>
          </div>
        </section>

        {/* 상품 상세 정보 */}
        <section className="shop-sell__details">
          {productDetails.map((detail, index) => (
            <div key={index} className="shop-sell__detail-row">
              <span className="shop-sell__detail-label">{detail.label}</span>
              <span className="shop-sell__detail-value">{formData[detail.key]}</span>
            </div>
          ))}
        </section>

        {/* 하단 버튼 */}
        <div className="shop-sell__buttons">
          <button className="shop-sell__button shop-sell__button--cancel" onClick={handleCancel}>
            취소하기
          </button>
          <button className="shop-sell__button shop-sell__button--submit" onClick={handleSubmit}>
            판매 등록
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default ShopSell
