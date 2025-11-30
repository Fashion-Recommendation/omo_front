import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useClosetStore from '../../store/closetStore'
import useCodiStore from '../../store/useCodiStore'

const ClosetDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    selectedItem,
    fetchClothesDetail,
  } = useClosetStore()

  const { setBaseClothing } = useCodiStore()

  useEffect(() => {
    fetchClothesDetail(id)
  }, [id, fetchClothesDetail])

  if (!selectedItem) return <div>로딩 중...</div>

  const item = selectedItem

  const details = [
    { label: '사이즈', value: item.size },
    { label: '착용횟수', value: item.wear_cnt },
    { label: '스타일', value: item.style },
    { label: '계절', value: item.season },
    { label: '카테고리', value: item.category },
  ]

  const handleRecommend = () => {
    setBaseClothing(item)
    navigate('/ai/recommend')
  }

  return (
    <div className="page">
      <TopBar title="내 옷장" onBack={() => navigate(-1)} />

      <main className="closet-detail__content">
        <div className="closet-detail__image">
          <img src={item.image_url} alt={item.name} />
        </div>

        <h1 className="closet-detail__title">{item.name}</h1>

        <section className="closet-detail__info">
          {details.map((d, idx) => (
            <div key={idx} className="info-row">
              <span className="info-label">{d.label}</span>
              <span className="info-value">{d.value}</span>
            </div>
          ))}
        </section>

        <button className="cta-button closet-detail__button" onClick={handleRecommend}>
          코디 추천 받기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default ClosetDetail
