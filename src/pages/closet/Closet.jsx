import React, { useEffect } from 'react'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import ClosetItemCard from './components/ClosetItemCard'
import useClosetStore from '../../store/closetStore'

const Closet = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    getFilteredItems,
    fetchClosetItems,
  } = useClosetStore()

  useEffect(() => {
    fetchClosetItems(1)   // 로그인 구현 전 → 임시 member_id = 1
  }, [])

  const filtered = getFilteredItems()

  return (
    <div className="page">
      <TopBar title="내 옷장" />

      <main className="closet-page__content">
        {/* 카테고리 */}
        <nav className="closet-categories">
          {['전체', 'top', 'bottom', 'outer', 'shoes'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`closet-category ${selectedCategory === cat ? 'is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* 옷 목록 */}
        <section className="closet-grid">
          {filtered.map((item) => (
            <ClosetItemCard key={item.fashion_item_id} item={item} />
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Closet
