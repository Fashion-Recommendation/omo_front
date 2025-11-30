import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClosetItemCard = ({ item }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/closet/detail/${item.fashion_item_id}`)
  }

  return (
    <article className="closet-item" onClick={handleClick}>
      <div className="closet-item__image">
        <img src={item.image_url || 'https://via.placeholder.com/189'} alt={item.name} />
      </div>
      <div className="closet-item__info">
        <h3 className="closet-item__title">{item.name}</h3>
        <p className="closet-item__tag">#{item.style}</p>
        <p className="closet-item__wear">착용 {item.wear_cnt}회</p>
      </div>
    </article>
  )
}

export default ClosetItemCard
