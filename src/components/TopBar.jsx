const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M5 20c0-3.5 3.1-5 7-5s7 1.5 7 5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

const TopBar = ({ onBack, onProfile }) => {
  return (
    <header className="topbar">
      <div className="topbar__status-row">
        <button type="button" className="topbar__icon-button" onClick={onBack} aria-label="뒤로 가기">
          <BackIcon />
        </button>

        <div className="topbar__brand">ㅇㅁㅇ</div>

        <button
          type="button"
          className="topbar__icon-button"
          onClick={onProfile}
          aria-label="프로필로 이동"
        >
          <ProfileIcon />
        </button>
      </div>

      <div className="topbar__title-row">AI 코디 추천</div>
    </header>
  )
}

export default TopBar

