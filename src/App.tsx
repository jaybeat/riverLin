import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Writings from './components/Writings'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import ArticleDetail from './components/ArticleDetail'

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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
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
