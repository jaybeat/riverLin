import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Writings from './components/Writings'
import Footer from './components/Footer'

// 详情页按路由懒加载：把 react-markdown 等重依赖移出首页初始包
const ProjectDetail = lazy(() => import('./components/ProjectDetail'))
const ArticleDetail = lazy(() => import('./components/ArticleDetail'))

function HomePage() {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <Hero />
      <Projects />
      <Writings />
      <Footer />
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <AnimatedRoutes />
    </div>
  )
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
