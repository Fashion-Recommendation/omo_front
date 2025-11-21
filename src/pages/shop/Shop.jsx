import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

// 더미 데이터
const SHOP_PRODUCTS = [
  {
    id: 1,
    name: '블랙 패딩',
    price: '77,700원',
    tags: ['#포멀', '# 여름'],
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 2,
    name: '블랙 포플린 자켓',
    price: '27,700원',
    tags: ['#스트릿', '#가을'],
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 3,
    name: '블랙 마이크로 패딩',
    price: '37,700원',
    tags: ['#스트릿', '#겨울'],
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 4,
    name: '수베니어 봄버자켓',
    price: '127,700원',
    tags: ['#스트릿', '#겨울'],
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 5,
    name: '흰 셔츠',
    price: '47,700원',
    tags: ['#포멀'],
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 6,
    name: '베이지 치노팬츠',
    price: '67,700원',
    tags: ['#캐주얼', '#봄'],
    image: 'https://via.placeholder.com/189',
  },
]

const Shop = () => {
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const categories = ['전체', '상의', '하의', '아우터', '신발']

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  const handleSellFromCloset = () => {
    navigate('/shop/sell')
  }

  const handleProductClick = (productId) => {
    navigate(`/shop/detail/${productId}`)
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="shop-page__content">
        {/* 77샵 로고 헤더 */}
        <div className="shop-header">
          <img src="/77-logo.png" alt="77샵" className="shop-header__logo" />
        </div>

        {/* 카테고리 필터 */}
        <nav className="shop-categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shop-category ${selectedCategory === category ? 'is-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* 내 옷장에서 판매하기 버튼 */}
        <button className="shop-sell-button" onClick={handleSellFromCloset}>
          <span className="shop-sell-button__icon">+</span>
          <span className="shop-sell-button__text">내 옷장에서 판매하기</span>
        </button>

        {/* 상품 그리드 */}
        <section className="shop-products">
          {SHOP_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="shop-product"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="shop-product__image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="shop-product__info">
                <div className="shop-product__header">
                  <h3 className="shop-product__name">{product.name}</h3>
                  <span className="shop-product__price">{product.price}</span>
                </div>
                <div className="shop-product__tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="shop-product__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Shop
