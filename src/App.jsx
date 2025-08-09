// src/App.jsx - УЛУЧШЕННАЯ ВЕРСИЯ с более гибкими правами
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';
import { ProfilePage } from './pages/Profile/Profile';
import { AuthPage } from './pages/Auth/Auth';
import { AccessDenied } from './pages/AccessDenied/AccessDenied';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          
          {/* Защищенные маршруты для авторизованных пользователей */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* УЛУЧШЕНИЕ: Админские маршруты с конкретными правами */}
          <Route path="/admin" element={
            <ProtectedRoute permission="admin">
              <div className="p-8 text-center">
                <h1 className="text-2xl font-light mb-4">Панель администратора</h1>
                <p>Здесь будет админская панель</p>
              </div>
            </ProtectedRoute>
          } />
          
          
          {/* Маршруты авторизации - для НЕавторизованных */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          } />
          
          {/* Страница отказа в доступе */}
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;