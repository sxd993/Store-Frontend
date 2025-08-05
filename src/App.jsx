import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from '../src/pages/Home/Home'
import Footer from './components/Footer/Footer'
import About from '../src/pages/About/About'

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App