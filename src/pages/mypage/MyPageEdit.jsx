import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'
import useUserStore from '../../store/userStore'

const MyPageEdit = () => {
  const navigate = useNavigate()
  const { currentUser, isLoading, updateMyInfo, fetchMyInfo } = useUserStore()

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    show_closet: true,
    profile_image_url: '',
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        height: currentUser.height || '',
        weight: currentUser.weight || '',
        show_closet: currentUser.show_closet ?? true,
        profile_image_url: currentUser.profile_image_url || '',
      })
    } else {
      fetchMyInfo()
    }
  }, [currentUser])

  const handleBack = () => {
    navigate(-1)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    try {
      await updateMyInfo({
        height: Number(formData.height) || null,
        weight: Number(formData.weight) || null,
        show_closet: formData.show_closet,
        profile_image_url: formData.profile_image_url || null,
      })
      alert('정보가 수정되었습니다.')
      navigate('/mypage')
    } catch (error) {
      alert('수정에 실패했습니다.')
    }
  }

  if (isLoading) {
    return (
      <div className="page mypage-edit-page">
        <TopBar onBack={handleBack} title="회원 정보 수정" />
        <main className="mypage-edit__content">
          <p>로딩 중...</p>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="page mypage-edit-page">
      <TopBar onBack={handleBack} title="회원 정보 수정" />

      <main className="mypage-edit__content">
        {/* 프로필 이미지 */}
        <div className="profile-section">
          <div
            className="profile-avatar"
            style={{
              backgroundImage: formData.profile_image_url
                ? `url(${formData.profile_image_url})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="profile-info">
            <h2 className="profile-username">{currentUser?.name || '사용자'}님의 정보 수정</h2>
          </div>
        </div>

        {/* 개인 정보 (읽기 전용) */}
        <div className="section-wrapper">
          <h3 className="section-title">개인 정보</h3>
          <section className="info-section" aria-label="개인 정보">
            <div className="info-row">
              <span className="info-label">이름</span>
              <span className="info-value">{currentUser?.name || '-'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">이메일</span>
              <span className="info-value">{currentUser?.email || '-'}</span>
            </div>
          </section>
        </div>

        {/* 체형 정보 (수정 가능) */}
        <div className="section-wrapper">
          <h3 className="section-title">체형 정보</h3>
          <section className="info-section" aria-label="체형 정보">
            <div className="info-row">
              <label className="info-label" htmlFor="height">키 (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                className="info-input"
                value={formData.height}
                onChange={handleChange}
                placeholder="키를 입력하세요"
              />
            </div>
            <div className="info-row">
              <label className="info-label" htmlFor="weight">체중 (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                className="info-input"
                value={formData.weight}
                onChange={handleChange}
                placeholder="체중을 입력하세요"
              />
            </div>
            <div className="info-row">
              <label className="info-label" htmlFor="show_closet">옷장 공개</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="show_closet"
                  name="show_closet"
                  checked={formData.show_closet}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </section>
        </div>

        {/* 프로필 이미지 URL */}
        <div className="section-wrapper">
          <h3 className="section-title">프로필 이미지</h3>
          <section className="info-section">
            <div className="info-row">
              <label className="info-label" htmlFor="profile_image_url">이미지 URL</label>
              <input
                type="text"
                id="profile_image_url"
                name="profile_image_url"
                className="info-input"
                value={formData.profile_image_url}
                onChange={handleChange}
                placeholder="이미지 URL을 입력하세요"
              />
            </div>
          </section>
        </div>

        {/* 수정 버튼 */}
        <button
          className="primary-button primary-button--full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? '수정 중...' : '수정 완료'}
        </button>
      </main>

      <BottomNav />
    </div>
  )
}

export default MyPageEdit
