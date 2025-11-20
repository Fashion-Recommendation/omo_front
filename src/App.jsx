import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import AiCodiRecommendation from './pages/ai/AiCodiRecommendation'
import AiCodiComplete from './pages/ai/AiCodiComplete'
import AiCodiComplete2 from './pages/ai/AiCodiComplete2'
import AiCodiSubmit from './pages/ai/AiCodiSubmit'
import AiCodiFeedback from './pages/ai/AiCodiFeedback'
import MyPageEdit from './pages/mypage/MyPageEdit'
import Closet from './pages/closet/Closet'
import ClosetDetail from './pages/closet/ClosetDetail'
import Sns from './pages/sns/Sns'
import SnsDetail from './pages/sns/SnsDetail'
import SnsProfile from './pages/sns/SnsProfile'
import SnsItemDetail from './pages/sns/SnsItemDetail'
import SnsItemInfo from './pages/sns/SnsItemInfo'
import Login from './pages/Login'

const App = () => {
  const aiPages = [
    { path: 'AiCodiRecommendation', element: <AiCodiRecommendation /> },
    { path: 'AiCodiComplete', element: <AiCodiComplete /> },
    { path: 'AiCodiComplete2', element: <AiCodiComplete2 /> },
    { path: 'AiCodiSubmit', element: <AiCodiSubmit /> },
    { path: 'AiCodiFeedback', element: <AiCodiFeedback /> },
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {aiPages.map(({ path, element }) => (
          <Route key={path} path={`/ai/${path}`} element={element} />
        ))}
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/closet/detail/:id" element={<ClosetDetail />} />
        <Route path="/sns" element={<Sns />} />
        <Route path="/sns/detail/:id" element={<SnsDetail />} />
        <Route path="/sns/detail/:postId/:itemId" element={<SnsItemDetail />} />
        <Route path="/sns/info/:postId/:itemId" element={<SnsItemInfo />} />
        <Route path="/sns/profile/:userId" element={<SnsProfile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
