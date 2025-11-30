import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileFeedCard = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/sns/detail/${post.id}`)
  }

  return (
    <div className="profile-feed-card" onClick={handleClick}>
      <div className="profile-feed-card__images">
        <img src={post.image} alt="피드 이미지 1" className="profile-feed-card__image" />
      </div>
    </div>
  )
}

export default ProfileFeedCard
