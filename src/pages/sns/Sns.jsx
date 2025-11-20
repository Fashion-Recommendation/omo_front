import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import SnsCard from './components/SnsCard'
import useUserStore from '../../store/userStore'

// 더미 데이터
const SNS_POSTS = [
  {
    id: 1,
    username: 'rktclgh',
    leftImage: 'https://via.placeholder.com/210',
    rightImage: 'https://via.placeholder.com/210',
  },
  {
    id: 2,
    username: 'rktclgh',
    leftImage: 'https://via.placeholder.com/210',
    rightImage: 'https://via.placeholder.com/210',
  },
  {
    id: 3,
    username: 'rktclgh',
    leftImage: 'https://via.placeholder.com/210',
    rightImage: 'https://via.placeholder.com/210',
  },
  {
    id: 4,
    username: 'rktclgh',
    leftImage: 'https://via.placeholder.com/210',
    rightImage: 'https://via.placeholder.com/210',
  },
]

const Sns = () => {
  const navigate = useNavigate()
  const { currentUser } = useUserStore()

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  const handleCreateFeed = () => {
    console.log('피드 작성하기')
  }

  const handleUserClick = () => {
    navigate(`/sns/profile/${currentUser.userId}`)
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="sns-page__content">
        {/* 사용자 정보 및 피드 작성 버튼 */}
        <div className="sns-header">
          <div className="sns-user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <div className="sns-user__avatar" />
            <span className="sns-user__name">{currentUser.username}</span>
          </div>
          <button className="sns-create-button" onClick={handleCreateFeed}>
            <span className="sns-create-icon">+</span>
            <span>피드 작성하기</span>
          </button>
        </div>

        {/* SNS 피드 그리드 */}
        <section className="sns-grid">
          {SNS_POSTS.length > 0 ? (
            SNS_POSTS.map((post) => <SnsCard key={post.id} post={post} />)
          ) : (
            <div className="sns-empty">
              <p>아직 게시물이 없습니다</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Sns
