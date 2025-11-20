import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClosetItemCard = ({ item }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/closet/detail/${item.id}`)
  }

  return (
    <article className="closet-item" onClick={handleClick}>
      <div className="closet-item__image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="closet-item__info">
        <h3 className="closet-item__title">{item.title}</h3>
        <p className="closet-item__tag">{item.tag}</p>
        <p className="closet-item__wear">착용 {item.wearCount}회</p>
      </div>
    </article>
  )
}

export default ClosetItemCard
