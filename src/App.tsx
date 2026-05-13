import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Writings from './components/Writings'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-detail'>('home')

  const handleSelectProject = () => {
    setCurrentView('project-detail')
    window.scrollTo(0, 0)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    window.scrollTo(0, 0)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar />
            <Hero />
            <Projects onSelectProject={handleSelectProject} />
            <Writings />
            <Footer />
          </motion.div>
        ) : (
          <ProjectDetail key="project-detail" onBack={handleBackToHome} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
