import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../features/auth';

// Импорты страниц
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import Product from '../../pages/Product/ProductPage';
import Cart from '../../pages/Cart/Cart.jsx';
import { ProfilePage } from '../../pages/Profile/Profile';
import { AuthPage } from '../../pages/Auth/Auth';
import { AccessDenied } from '../../pages/AccessDenied/AccessDenied';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      
      {/* Защищенные маршруты для авторизованных пользователей */}
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      
      {/* Админские маршруты */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute permission="admin">
            <div className="p-8 text-center">
              <h1 className="text-2xl font-light mb-4">Панель администратора</h1>
              <p>Здесь будет админская панель</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Маршруты авторизации */}
      <Route 
        path="/login" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Страница отказа в доступе */}
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
};