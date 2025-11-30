import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'
import useSnsStore from '../../store/snsStore'


// 더미 데이터
const SNS_DETAIL_DATA = {
  1: {
    id: 1,
    username: 'rktclgh',
    avatar: '/avatar.png',
    mainImage: 'https://via.placeholder.com/430x451',
    likes: 43,
    description: '나는야 패션왕',
    date: '2025-11-20',
    postedTime: '1주일 전',
    clothingItems: [
      {
        id: 1,
        name: '슈프림 카모 후드',
        image: 'https://via.placeholder.com/100x97',
        isForSale: true,
      },
      {
        id: 2,
        name: '아오이로 더블니',
        image: 'https://via.placeholder.com/80x88',
        isForSale: false,
      },
      {
        id: 3,
        name: '버켄스탁 보스톤',
        image: 'https://via.placeholder.com/100x84',
        isForSale: false,
      },
    ],
  },
}

  const SnsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useUserStore();
    const { postDetail, detailLoading, detailError, fetchPostDetail } = useSnsStore();

    useEffect(() => {
      fetchPostDetail(id);
    }, [id, fetchPostDetail]);

    const handleBack = () => window.history.back();
    const handleProfile = () => navigate(`/sns/profile/${currentUser?.id ?? currentUser?.userId ?? ''}`);
    const handleLike = () => console.log('좋아요');
    const handleUserClick = () => navigate(`/sns/profile/${postDetail?.member?.id ?? ''}`);
    const handleItemClick = (item) => {
      const payload = { item, member: postDetail.member };
      if (item.isOnSale) navigate(`/sns/detail/${id}/${item.id}`, { state: payload });
      else navigate(`/sns/info/${id}/${item.id}`, { state: payload });
    };


    if (detailLoading) {
      return (
        <div className="page">
          <TopBar onBack={handleBack} onProfile={handleProfile} />
          <main className="sns-detail__content"><p>로딩...</p></main>
          <BottomNav />
        </div>
      );
    }

    if (detailError || !postDetail) {
      return (
        <div className="page">
          <TopBar onBack={handleBack} onProfile={handleProfile} />
          <main className="sns-detail__content"><p>오류: {detailError || '데이터 없음'}</p></main>
          <BottomNav />
        </div>
      );
    }

    return (
      <div className="page">
        <TopBar onBack={handleBack} onProfile={handleProfile} />

        <main className="sns-detail__content">
          {/* 사용자 정보 */}
          <div className="sns-detail__user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <div
              className="sns-detail__avatar"
              style={{
                backgroundImage: `url(${postDetail.member?.profileImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <span className="sns-detail__username">{postDetail.member?.username}</span>
          </div>

          {/* 메인 이미지 */}
          <div className="sns-detail__main-image">
            <img src={postDetail.image} alt="게시물 이미지" />
          </div>

          {/* 좋아요 */}
          <div className="sns-detail__likes">
            <button className="sns-detail__like-button" onClick={handleLike}>❤</button>
            <span className="sns-detail__like-count">{postDetail.likeCnt}</span>
          </div>

          {/* 날짜 */}
          <div className="sns-detail__date">{postDetail.createdAt}</div>

          {/* 설명 */}
          <div className="sns-detail__description">
            <p>{postDetail.content}</p>
          </div>

          {/* 착용 의류 정보 */}
          <section className="sns-detail__clothing">
            <h2 className="sns-detail__clothing-title">착용 의류 정보</h2>

            <div className="sns-detail__clothing-items">
              {postDetail.items.map((item) => (
                <div
                  key={item.id}
                  className="sns-detail__clothing-item"
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sns-detail__clothing-image">
                    <img src={item.image} alt={item.name} />
                    {item.isOnSale && (
                      <div className="sns-detail__badge">
                        <img src="/77-logo.png" alt="77샵" />
                      </div>
                    )}
                  </div>
                  <p className="sns-detail__clothing-name">{item.name}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    );
  };

export default SnsDetail
