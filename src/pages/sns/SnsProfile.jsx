import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import ProfileFeedCard from './components/ProfileFeedCard'
import ClosetItemCard from '../closet/components/ClosetItemCard'

// 더미 데이터
const USER_PROFILE_DATA = {
  rktclgh: {
    userId: 'rktclgh',
    avatar: '/avatar.png',
    posts: 324,
    followers: 1200,
    following: 456,
    bio: '패션을 사랑하는 사람입니다',
    isClosetPublic: true,
    feeds: [
      {
        id: 1,
        leftImage: 'https://via.placeholder.com/210',
        rightImage: 'https://via.placeholder.com/210',
      },
      {
        id: 2,
        leftImage: 'https://via.placeholder.com/210',
        rightImage: 'https://via.placeholder.com/210',
      },
      {
        id: 3,
        leftImage: 'https://via.placeholder.com/210',
        rightImage: 'https://via.placeholder.com/210',
      },
    ],
    closetItems: [
      { id: 1, name: '슈프림 후드', image: 'https://via.placeholder.com/210', category: '상의' },
      { id: 2, name: '아오이로 더블니', image: 'https://via.placeholder.com/210', category: '하의' },
      { id: 3, name: '버켄스탁 보스톤', image: 'https://via.placeholder.com/210', category: '신발' },
    ],
  },
}

const SnsProfile = () => {
  const { userId } = useParams()
  const [activeTab, setActiveTab] = useState('feed')
  const userData = USER_PROFILE_DATA[userId] || USER_PROFILE_DATA.rktclgh

  const handleBack = () => {
    window.history.back()
  }

  const handleProfile = () => {
    console.log('프로필로 이동')
  }

  const handleFollow = () => {
    console.log('팔로우')
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} onProfile={handleProfile} />

      <main className="sns-profile__content">
        {/* 프로필 헤더 */}
        <div className="sns-profile__header">
          <div className="sns-profile__avatar" />

          <div className="sns-profile__stats">
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{userData.posts}</span>
              <span className="sns-profile__stat-label">게시물</span>
            </div>
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{userData.followers}</span>
              <span className="sns-profile__stat-label">팔로워</span>
            </div>
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{userData.following}</span>
              <span className="sns-profile__stat-label">팔로잉</span>
            </div>
          </div>
        </div>

        <div className="sns-profile__info">
          <h1 className="sns-profile__username">{userData.userId}</h1>
          <p className="sns-profile__bio">{userData.bio}</p>
          <button className="sns-profile__follow-button" onClick={handleFollow}>
            팔로우
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="sns-profile__tabs">
          <button
            className={`sns-profile__tab ${activeTab === 'feed' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            피드
          </button>
          <button
            className={`sns-profile__tab ${activeTab === 'closet' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('closet')}
          >
            옷장
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'feed' && (
          <div className="sns-profile__feed-grid">
            {userData.feeds.map((post) => (
              <ProfileFeedCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {activeTab === 'closet' && (
          <div className="sns-profile__closet">
            {userData.isClosetPublic ? (
              <div className="sns-profile__closet-grid">
                {userData.closetItems.map((item) => (
                  <ClosetItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="sns-profile__closet-private">
                <p>공개되지 않은 옷장입니다</p>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default SnsProfile
