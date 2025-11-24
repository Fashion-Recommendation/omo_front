import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/login')
  }

  return (
    <div className="not-found">
      <div className="not-found__content">
        <img src="/omo.png" alt="OMO" className="not-found__logo" />
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Page Not Found</p>
        <p className="not-found__message">잘못된 접근입니다</p>
        <button className="not-found__button" onClick={handleGoHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

export default NotFound
