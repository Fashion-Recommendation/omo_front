import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useClosetStore from '../../store/closetStore'
import useCodiStore from '../../store/useCodiStore'

const CATEGORY_OPTIONS = ['전체', '상의', '하의', '아우터', '신발']

const AiCodiEdit = () => {
  const navigate = useNavigate()
  const { items: closetItems, fetchClosetItems } = useClosetStore()
  const { selectedOutfit, setSelectedOutfit } = useCodiStore()

  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    if (closetItems.length === 0) {
      fetchClosetItems(1)
    }
  }, [])

  useEffect(() => {
    // 기존 선택된 아이템들 초기화
    if (selectedOutfit?.items) {
      setSelectedItems(selectedOutfit.items.map(item => item?.fashion_item_id).filter(Boolean))
    }
  }, [selectedOutfit])

  const handleBack = () => navigate(-1)

  const handleToggleItem = (item) => {
    const itemId = item.fashion_item_id
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId)
      } else {
        return [...prev, itemId]
      }
    })
  }

  const handleComplete = () => {
    // 선택된 아이템들로 outfit 업데이트
    const newItems = closetItems.filter(item => selectedItems.includes(item.fashion_item_id))

    setSelectedOutfit({
      ...selectedOutfit,
      items: newItems,
      description: newItems.map(item => item.name).join(' + '),
    })

    navigate('/ai/submit')
  }

  // 카테고리 필터링
  const filteredItems = closetItems.filter(item => {
    if (selectedCategory === '전체') return true

    const categoryMap = {
      '상의': ['top', 'shirt', 'tshirt', '상의', '니트', '셔츠'],
      '하의': ['bottom', 'pants', 'skirt', '하의', '팬츠', '슬랙스'],
      '아우터': ['outer', 'jacket', 'coat', '아우터', '자켓', '패딩', '코트'],
      '신발': ['shoes', 'sneakers', '신발', '로퍼', '스니커즈'],
    }

    const keywords = categoryMap[selectedCategory] || []
    const itemCategory = (item.category || '').toLowerCase()
    const itemName = (item.name || '').toLowerCase()

    return keywords.some(keyword =>
      itemCategory.includes(keyword) || itemName.includes(keyword)
    )
  })

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <div className="page-header">
        <h1 className="page-header__title">내 옷장</h1>
      </div>

      <main className="page__content page__content--no-padding">
        {/* 카테고리 필터 */}
        <div className="category-filter">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'category-chip--active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 옷장 그리드 */}
        <div className="closet-grid closet-grid--edit">
          {filteredItems.map((item) => {
            const isSelected = selectedItems.includes(item.fashion_item_id)
            return (
              <div
                key={item.fashion_item_id}
                className={`closet-card ${isSelected ? 'closet-card--selected' : ''}`}
                onClick={() => handleToggleItem(item)}
              >
                <div
                  className="closet-card__image"
                  style={{
                    backgroundImage: `url(${item.image_url})`,
                  }}
                >
                  {isSelected && (
                    <div className="closet-card__check">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="#007AFF" stroke="#007AFF" strokeWidth="2"/>
                        <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="closet-card__info">
                  <p className="closet-card__name">{item.name}</p>
                  <p className="closet-card__tag">#{item.style}</p>
                  <p className="closet-card__count">착용 {item.wear_count || 0}회</p>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* 선택 완료 버튼 - 하단 고정 */}
      <div className="bottom-cta">
        <button className="cta-button cta-button--full" onClick={handleComplete}>
          선택 완료
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

export default AiCodiEdit
