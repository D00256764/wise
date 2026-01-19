import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './assets/Navbar'
import Home from './assets/Home'
import Register from './assets/Register'
import Login from './assets/Login'
import Dashboard from './assets/Dashboard'
import Lessons from './assets/Lessons'
import LessonDetail from './assets/LessonDetail'
import Quiz from './assets/Quiz'
import BudgetCalculator from './assets/BudgetCalculator'

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/budget" element={<BudgetCalculator />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
        