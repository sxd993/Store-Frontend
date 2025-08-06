import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './ui/Header/Header'
import Footer from './ui/Footer/Footer'
import Home from '../src/pages/Home/Home'
import About from '../src/pages/About/About'
import Catalog from './pages/Catalog/Catalog'
import ProductPage from './pages/Product/ProductPage'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import ForgotPassword from './components/Login/ForgotPassword'
import CodeConfirmation from './components/Login/CodeConfirmation'
import ChangePassword from './components/Login/ChangePassword'

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/code-confirmation" element={<CodeConfirmation />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App