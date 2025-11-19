import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import AiCodiRecommendation from './pages/AiCodiRecommendation'
import AiCodiComplete from './pages/AiCodiComplete'
import AiCodiComplete2 from './pages/AiCodiComplete2'
import AiCodiFeedback from './pages/AiCodiFeedback'

const App = () => {
  const aiPages = [
    { path: 'AiCodiRecommendation', element: <AiCodiRecommendation /> },
    { path: 'AiCodiComplete', element: <AiCodiComplete /> },
    { path: 'AiCodiComplete2', element: <AiCodiComplete2 /> },
    { path: 'AiCodiFeedback', element: <AiCodiFeedback /> },
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ai/AiCodiRecommendation" replace />} />
        {aiPages.map(({ path, element }) => (
          <Route key={path} path={`/ai/${path}`} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/ai/AiCodiRecommendation" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
