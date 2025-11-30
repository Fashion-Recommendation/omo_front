import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import ProfileFeedCard from './components/ProfileFeedCard'
import SnSClosetItemCard from './components/SnsClosetItemCard'
import useSnsStore from '../../store/snsStore'

const SnsProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('feed');
  const { profile, posts, isLoading, error, closet, closetLoading, closetError,
    fetchProfileAndPosts, fetchUserCloset } = useSnsStore();

  useEffect(() => {
    fetchProfileAndPosts(userId);
    fetchUserCloset(userId)
  }, [userId, fetchProfileAndPosts, fetchUserCloset]);

  const handleBack = () => window.history.back();
  const handleFollow = () => console.log('팔로우');

  if (isLoading) {
    return (
      <div className="page">
        <TopBar onBack={handleBack} />
        <main className="sns-profile__content"><p>로딩...</p></main>
        <BottomNav />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="page">
        <TopBar onBack={handleBack} />
        <main className="sns-profile__content"><p>오류: {error || '데이터 없음'}</p></main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="page">
      <TopBar onBack={handleBack} />

      <main className="sns-profile__content">
        {/* 프로필 헤더 */}
        <div className="sns-profile__header">
          <div
            className="sns-profile__avatar"
            style={{
              backgroundImage: `url(${profile.profile_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="sns-profile__stats">
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{profile.sns_post_cnt}</span>
              <span className="sns-profile__stat-label">게시물</span>
            </div>
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{profile.follower_cnt}</span>
              <span className="sns-profile__stat-label">팔로워</span>
            </div>
            <div className="sns-profile__stat">
              <span className="sns-profile__stat-number">{profile.following_cnt}</span>
              <span className="sns-profile__stat-label">팔로잉</span>
            </div>
          </div>
        </div>

        <div className="sns-profile__info">
          <h1 className="sns-profile__username">{profile.username}</h1>
          <p className="sns-profile__bio">{profile.bio || ''}</p>
          <button className="sns-profile__follow-button" onClick={handleFollow}>팔로우</button>
        </div>

        {/* 탭 */}
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

        {/* 피드: 3컬럼, 게시물당 한 장 */}
        {activeTab === 'feed' && (
          <div className="sns-profile__feed-grid">
            {posts.map((post) => (
              <ProfileFeedCard key={post.id} post={{ id:post.id, image: post.image }} />
            ))}
          </div>
        )}

        {/* 옷장: 백엔드 미연동이면 안내 */}
        {activeTab === 'closet' && (
          <div className="sns-profile__closet">
            {closetLoading && <p>옷장 로딩...</p>}
            {closetError && <p>오류: {closetError}</p>}
            {!closetLoading && !closetError && closet.length === 0 && (
              <div className="sns-profile__closet-private"><p>옷장에 아이템이 없습니다</p></div>
            )}
        {!closetLoading && !closetError && closet.length > 0 && (
          <div className="sns-profile__closet-grid">
            {closet.map((item) => (
              <SnSClosetItemCard key={item.id} item={{ id: item.id, image: item.image, name: item.name, category:
        item.category }} />
            ))}
          </div>
  )}

    </div>
  )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SnsProfile;
