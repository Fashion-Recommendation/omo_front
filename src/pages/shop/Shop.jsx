import React, { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'
import useShopStore from '../../store/shopStore'

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
  const { posts: products, isLoading, error, fetchAllPosts } = useShopStore()
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const filtered = useMemo(() => {
    if (selectedCategory === '전체') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleProductClick = (id) => navigate(`/shop/detail/${id}`);

    if (isLoading) return <div>로딩...</div>;
    if (error) return <div>오류: {error}</div>;

  return (
    <div className="page">
      <TopBar onBack={() => navigate(-1)} onProfile={() => navigate(`/sns/profile/${currentUser.userId}`)} />
      <main className="shop-page__content">
        <div className="shop-header">
          <img src="/77-logo.png" alt="77샵" className="shop-header__logo" />
        </div>

        <nav className="shop-categories">
          {['전체', 'top', 'bottom', 'outer', 'shoes'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shop-category ${selectedCategory === category ? 'is-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </nav>

        <button className="shop-sell-button" onClick={() => navigate('/shop/sell')}>
          <span className="shop-sell-button__icon">+</span>
          <span className="shop-sell-button__text">내 옷장에서 판매하기</span>
        </button>

        <section className="shop-products">
          {filtered.map((product) => (
            <div key={product.id} className="shop-product" onClick={() => handleProductClick(product.id)}>
              <div className="shop-product__image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="shop-product__info">
                <div className="shop-product__header">
                  <h3 className="shop-product__name">{product.name}</h3>
                  <span className="shop-product__price">
                    {new Intl.NumberFormat('ko-KR').format(product.price)}원
                  </span>
                </div>
                <div className="shop-product__tags">
                  <span className="shop-product__tag">#{product.style}</span>
                  {product.season && <span className="shop-product__tag">#{product.season}</span>}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <BottomNav />
    </div>
  );
  };

  export default Shop;
