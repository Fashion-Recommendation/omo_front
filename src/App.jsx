import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import AiCodiRecommend from './pages/ai/AiCodiRecommend'
import AiCodiRecommend2 from './pages/ai/AiCodiRecommend2'
import AiCodiSubmit from './pages/ai/AiCodiSubmit'
import AiCodiEdit from './pages/ai/AiCodiEdit'
import AiCodiFeedback from './pages/ai/AiCodiFeedback'
import AiCodiFeedback2 from './pages/ai/AiCodiFeedback2'
import MyPage from './pages/mypage/MyPage'
import MyPageEdit from './pages/mypage/MyPageEdit'
import Closet from './pages/closet/Closet'
import ClosetDetail from './pages/closet/ClosetDetail'
import Sns from './pages/sns/Sns'
import SnsDetail from './pages/sns/SnsDetail'
import SnsProfile from './pages/sns/SnsProfile'
import SnsItemDetail from './pages/sns/SnsItemDetail'
import SnsItemInfo from './pages/sns/SnsItemInfo'
import Shop from './pages/shop/Shop'
import ShopDetail from './pages/shop/ShopDetail'
import ShopSell from './pages/shop/ShopSell'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* AI 코디 추천 플로우 */}
        <Route path="/ai/recommend" element={<AiCodiRecommend />} />
        <Route path="/ai/recommend2" element={<AiCodiRecommend2 />} />
        <Route path="/ai/submit" element={<AiCodiSubmit />} />
        <Route path="/ai/edit" element={<AiCodiEdit />} />
        <Route path="/ai/feedback" element={<AiCodiFeedback />} />
        <Route path="/ai/feedback2" element={<AiCodiFeedback2 />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />

        {/* 옷장 */}
        <Route path="/closet" element={<Closet />} />
        <Route path="/closet/detail/:id" element={<ClosetDetail />} />

        {/* SNS */}
        <Route path="/sns" element={<Sns />} />
        <Route path="/sns/detail/:id" element={<SnsDetail />} />
        <Route path="/sns/detail/:postId/:itemId" element={<SnsItemDetail />} />
        <Route path="/sns/info/:postId/:itemId" element={<SnsItemInfo />} />
        <Route path="/sns/profile/:userId" element={<SnsProfile />} />

        {/* 77샵 */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/detail/:id" element={<ShopDetail />} />
        <Route path="/shop/sell" element={<ShopSell />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
