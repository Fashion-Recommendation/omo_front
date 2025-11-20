import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import ClosetItemCard from './components/ClosetItemCard'

// 더미 데이터
const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'top', label: '상의' },
  { id: 'bottom', label: '하의' },
  { id: 'outer', label: '아우터' },
  { id: 'shoes', label: '신발' },
]

const CLOTHING_ITEMS = [
  {
    id: 1,
    title: '블랙 패딩',
    tag: '#포멀',
    wearCount: 3,
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 2,
    title: '블랙 포플린 자켓',
    tag: '#스트릿',
    wearCount: 12,
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 3,
    title: '블랙 마이크로 패딩',
    tag: '#스트릿',
    wearCount: 5,
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 4,
    title: '수베니어 봄버자켓',
    tag: '#스트릿',
    wearCount: 4,
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 5,
    title: '흰 셔츠',
    tag: '#포멀',
    wearCount: 12,
    image: 'https://via.placeholder.com/189',
  },
  {
    id: 6,
    title: '데님 청바지',
    tag: '#캐주얼',
    wearCount: 8,
    image: 'https://via.placeholder.com/189',
  },
]

const Closet = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const handleBack = () => {
    console.log('뒤로 가기')
  }

  const handleProfile = () => {
    console.log('프로필로 이동')
  }

  const handleAddClothing = () => {
    console.log('옷 추가하기')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} title="내 옷장" />

      <main className="closet-page__content">
        {/* 카테고리 태그 */}
        <nav className="closet-categories">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.label)}
              className={`closet-category ${selectedCategory === category.label ? 'is-active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </nav>

        {/* 옷 추가 버튼 */}
        <button onClick={handleAddClothing} className="closet-add-button">
          <span className="closet-add-icon">+</span>
          <span>옷 추가하기</span>
        </button>

        {/* 옷 목록 그리드 */}
        <section className="closet-grid">
          {CLOTHING_ITEMS.map((item) => (
            <ClosetItemCard key={item.id} item={item} />
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Closet
