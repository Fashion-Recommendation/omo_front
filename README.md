# OMO 프론트엔드

패션 추천 및 SNS 플랫폼

## 📁 프로젝트 구조

```
src/
├── components/           # 공통 컴포넌트
│   ├── TopBar.jsx       # 상단 네비게이션 바
│   └── BottomNav.jsx    # 하단 네비게이션 바
├── pages/               # 페이지 컴포넌트
│   ├── ai/             # AI 코디 추천 관련
│   ├── closet/         # 옷장 관련
│   ├── mypage/         # 마이페이지 관련
│   ├── sns/            # SNS 관련
│   └── Login.jsx       # 로그인 페이지
├── store/              # Zustand 상태 관리
│   └── userStore.js    # 사용자 정보 store
└── App.jsx             # 메인 라우팅
```

## 🛣️ 라우팅 구조

### 인증
- `/` → `/login` (리다이렉트)
- `/login` - 로그인 페이지

### AI 코디 추천
- `/ai/AiCodiRecommendation` - AI 코디 추천 메인
- `/ai/AiCodiComplete` - 코디 완성 1
- `/ai/AiCodiComplete2` - 코디 완성 2
- `/ai/AiCodiSubmit` - 코디 제출
- `/ai/AiCodiFeedback` - 피드백

### 옷장
- `/closet` - 옷장 목록
- `/closet/detail/:id` - 옷 상세

### SNS
- `/sns` - SNS 피드 메인
- `/sns/detail/:id` - SNS 게시물 상세
- `/sns/detail/:postId/:itemId` - 판매중인 아이템 상세 (77샵)
- `/sns/info/:postId/:itemId` - 비판매 아이템 정보
- `/sns/profile/:userId` - 유저 프로필

### 마이페이지
- `/mypage/edit` - 프로필 편집

## 🗂️ 상태 관리 (Zustand)

### userStore.js


## 🎨 스타일링

- **CSS Framework**: Tailwind CSS + Custom CSS
- **스타일 파일**: `src/App.css`
- **반응형 디자인**: Mobile-first (최소 너비 430px)

## 📦 주요 라이브러리

- React 18
- React Router DOM 6
- Zustand (상태 관리)
- Axios (API 통신)
- Tailwind CSS

## 🚀 개발 시작

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📝 참고사항

1. **이미지 경로**: `/public` 폴더의 파일은 `/파일명`으로 접근
2. **77샵 로고**: `/public/77-logo.png` 사용
3. **Favicon**: `/public/omo.png` 사용
4. **더미 데이터**: 각 페이지 상단에 정의되어 있음
5. **라우팅**: `useNavigate`, `useParams` 사용
6. **전역 상태**: Zustand store 사용 (현재는 userStore만 존재)