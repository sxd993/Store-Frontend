import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Существующие компоненты
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';
import {ProfilePage} from './pages/Profile/Profile';

// Auth страницы
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;