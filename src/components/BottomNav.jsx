const ClosetIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 4v16M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const RecommendIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8l-4.8 2.5.9-5.4L4.2 8.7l5.4-.8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

const ShopIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 7h14l-1 12H6L5 7Zm0 0L6.5 3h11L19 7M9 11v4m6-4v4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProfileIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M5 20c0-3.5 3.1-5 7-5s7 1.5 7 5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

const navItems = [
  { label: '옷장', icon: ClosetIcon, isActive: false },
  { label: '코디추천', icon: RecommendIcon, isActive: true },
  { label: '77샵', icon: ShopIcon, isActive: false },
  { label: '프로필', icon: ProfileIcon, isActive: false },
]

const BottomNavItem = ({ label, Icon, isActive }) => (
  <button type="button" className={`bottom-nav__item ${isActive ? 'is-active' : ''}`}>
    <Icon />
    <span>{label}</span>
  </button>
)

const BottomNav = () => (
  <nav className="bottom-nav" aria-label="하단 메뉴">
    {navItems.map((item) => (
      <BottomNavItem key={item.label} label={item.label} Icon={item.icon} isActive={item.isActive} />
    ))}
  </nav>
)

export default BottomNav

