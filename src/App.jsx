import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from '../src/pages/Home/Home'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App