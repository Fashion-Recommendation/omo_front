import React from 'react'

const Login = () => {
  const handleKakaoLogin = () => {
    console.log('카카오 로그인')
    // TODO: 카카오 로그인 API 연동
  }

  return (
    <div className="login-page">
      <main className="login-content">
        <div className="login-logo">
          <h1 className="login-title">OMO</h1>
          <div className="login-underline" />
        </div>

        <p className="login-subtitle">옷장 속의 코디를 추천받으세요</p>

        <button className="kakao-login-button" onClick={handleKakaoLogin}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M9 0C4.02944 0 0 3.29813 0 7.36875C0 9.95156 1.62956 12.2109 4.09425 13.4859L3.13181 17.2266C3.04425 17.5641 3.42956 17.8266 3.72019 17.6297L8.19019 14.5266C8.45625 14.5547 8.72587 14.5688 9 14.5688C13.9706 14.5688 18 11.2706 18 7.2C18 3.12938 13.9706 0 9 0Z"
              fill="currentColor"
            />
          </svg>
          <span>카카오 로그인</span>
        </button>
      </main>
    </div>
  )
}

export default Login
