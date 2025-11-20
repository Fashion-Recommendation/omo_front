import React from 'react'
import { useNavigate } from 'react-router-dom'

const SnsCard = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/sns/detail/${post.id}`)
  }

  return (
    <article className="sns-card" onClick={handleClick}>
      <div className="sns-card__images">
        <div
          className="sns-card__image"
          style={{ backgroundImage: `url(${post.leftImage})` }}
        />
        <div
          className="sns-card__image"
          style={{ backgroundImage: `url(${post.rightImage})` }}
        />
      </div>
    </article>
  )
}

export default SnsCard
