import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useClosetStore from '../../store/closetStore'
import useCodiStore from '../../store/useCodiStore'

const ClosetDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, fetchClosetItems } = useClosetStore()
  const { setBaseClothing } = useCodiStore()

  useEffect(() => {
    if (items.length === 0) {
      fetchClosetItems(1)
    }
  }, [])

  // 현재 아이템 찾기
  const item = items.find((i) => String(i.fashion_item_id) === String(id)) || {
    fashion_item_id: id,
    name: '발렌시아가 아디다스 포플린 트랙자켓',
    image_url: 'https://picsum.photos/seed/item1/430',
    style: '스트릿',
    category: '아우터',
    situation: '학교',
    season: '가을, 봄',
    activity: '실외',
    size: 'XL',
    wear_count: 12,
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleProfile = () => {
    navigate('/mypage')
  }

  const handleRecommend = () => {
    // 현재 아이템을 기준 옷으로 설정하고 AI 코디 추천 페이지로 이동
    setBaseClothing({
      fashion_item_id: item.fashion_item_id,
      name: item.name,
      image_url: item.image_url,
      style: item.style,
      category: item.category,
    })
    navigate('/ai/recommend')
  }

  const details = [
    { label: '상황', value: item.situation || '데일리' },
    { label: '계절', value: item.season || '가을, 봄' },
    { label: '활동', value: item.activity || '실외' },
    { label: '사이즈', value: item.size || 'L' },
    { label: '착용횟수', value: item.wear_count || 0 },
    { label: '스타일', value: item.style || '캐주얼' },
  ]

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} title="내 옷장" />

      <main className="closet-detail__content">
        {/* 상품 이미지 */}
        <div className="closet-detail__image">
          <img src={item.image_url} alt={item.name} />
        </div>

        {/* 상품명 */}
        <h1 className="closet-detail__title">{item.name}</h1>

        {/* 상품 정보 */}
        <section className="closet-detail__info">
          {details.map((detail, index) => (
            <div key={index} className="info-row">
              <span className="info-label">{detail.label}</span>
              <span className="info-value">{detail.value}</span>
            </div>
          ))}
        </section>

        {/* 코디 추천 받기 버튼 */}
        <button className="cta-button closet-detail__button" onClick={handleRecommend}>
          코디 추천 받기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default ClosetDetail
