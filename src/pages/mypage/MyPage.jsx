import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

const PersonalInfoSection = ({ data }) => {
  const personalDetails = [
    { label: '이름', value: data.username || '-' },
    { label: '이메일', value: data.email || '-' },
  ]

  return (
    <section className="info-section" aria-label="개인 정보">
      {personalDetails.map((detail, index) => (
        <div key={index} className="info-row">
          <span className="info-label">{detail.label}</span>
          <span className="info-value">{detail.value}</span>
        </div>
      ))}
    </section>
  )
}

const BodyInfoSection = ({ data }) => {
  const bodyDetails = [
    { label: '키', value: data.height ? `${data.height}cm` : '-' },
    { label: '체중', value: data.weight ? `${data.weight}kg` : '-' },
    { label: '옷장 공개', value: data.show_closet ? 'ON' : 'OFF' },
  ]

  return (
    <section className="info-section" aria-label="체형 정보">
      {bodyDetails.map((item, index) => (
        <div key={index} className="info-row">
          <span className="info-label">{item.label}</span>
          <span className="info-value">{item.value}</span>
        </div>
      ))}
    </section>
  )
}

const MyPage = () => {
  const navigate = useNavigate()
  const { currentUser, isLoading, fetchMyInfo } = useUserStore()

  useEffect(() => {
    fetchMyInfo()
  }, [])

  const handleBack = () => {
    navigate(-1)
  }

  const handleProfile = () => {
    navigate(`/sns/profile/${currentUser?.id}`)
  }

  const handleEdit = () => {
    navigate('/mypage/edit')
  }

  if (isLoading) {
    return (
      <div className="page mypage-page">
        <TopBar onBack={handleBack} title="마이페이지" />
        <main className="mypage__content">
          <p>로딩 중...</p>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="page mypage-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} title="마이페이지" />

      <main className="mypage__content">
        {/* 프로필 이미지 */}
        <div className="profile-section">
          <div
            className="profile-avatar"
            style={{
              backgroundImage: currentUser?.profile_image_url
                ? `url(${currentUser.profile_image_url})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="profile-info">
            <h2 className="profile-username">{currentUser?.username || '사용자'}님</h2>
          </div>
        </div>

        {/* 개인 정보 */}
        <div className="section-wrapper">
          <h3 className="section-title">개인 정보</h3>
          <PersonalInfoSection data={currentUser || {}} />
        </div>

        {/* 체형 정보 */}
        <div className="section-wrapper">
          <h3 className="section-title">체형 정보</h3>
          <BodyInfoSection data={currentUser || {}} />
        </div>

        {/* 수정 버튼 */}
        <button className="primary-button primary-button--full" onClick={handleEdit}>
          정보 수정하기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default MyPage
