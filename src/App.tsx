import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Writings from './components/Writings'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Writings />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
