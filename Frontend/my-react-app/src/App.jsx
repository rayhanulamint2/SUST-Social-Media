import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home'
import Event from './pages/Event'
import Notice from './pages/Notice'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
