import React from 'react'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

// 더미 데이터 (나중에 Zustand로 대체)
const dummyUserData = {
  name: '송치호',
  email: 'rktclgh@kakao.com',
  gender: 'F',
  age: 24,
  joinDate: '2025-11-20',
  height: '173cm',
  weight: '42kg',
  style: '#포멀',
  closetPublic: 'ON',
}

const PersonalInfoSection = ({ data }) => {
  const personalDetails = [
    { label: '이름', value: data.name },
    { label: '이메일', value: data.email },
    { label: '성별', value: data.gender },
    { label: '나이', value: data.age },
    { label: '가입일', value: data.joinDate },
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
    { label: '키', value: data.height },
    { label: '체중', value: data.weight },
    { label: '선호 스타일', value: data.style },
    { label: '옷장 공개', value: data.closetPublic },
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

const MyPageEdit = () => {
  const handleBack = () => {
    console.log('뒤로 가기')
    // TODO: 나중에 네비게이션 구현
  }

  const handleProfile = () => {
    console.log('프로필로 이동')
    // TODO: 나중에 네비게이션 구현
  }

  const handleSubmit = () => {
    console.log('정보 수정하기')
    // TODO: 나중에 Zustand와 API 연동
  }

  return (
    <div className="page mypage-edit-page">
      <TopBar onBack={handleBack} onProfile={handleProfile} title="회원 정보 수정" />

      <main className="mypage-edit__content">
        {/* 프로필 이미지 */}
        <div className="profile-section">
          <div className="profile-avatar" />
          <div className="profile-info">
            <h2 className="profile-username">{dummyUserData.name}님의 개인 정보</h2>
          </div>
        </div>

        {/* 개인 정보 */}
        <div className="section-wrapper">
          <h3 className="section-title">개인 정보</h3>
          <PersonalInfoSection data={dummyUserData} />
        </div>

        {/* 체형 정보 */}
        <div className="section-wrapper">
          <h3 className="section-title">체형 정보</h3>
          <BodyInfoSection data={dummyUserData} />
        </div>

        {/* 수정 버튼 */}
        <button className="primary-button primary-button--full" onClick={handleSubmit}>
          정보 수정하기
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default MyPageEdit
