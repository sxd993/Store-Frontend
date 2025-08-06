import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './ui/Header/Header'
import Footer from './ui/Footer/Footer'
import Home from '../src/pages/Home/Home'
import About from '../src/pages/About/About'
import Catalog from './pages/Catalog/Catalog'
import ProductPage from './pages/Product/ProductPage'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App