import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute.jsx';

// Импорты страниц
import { Home } from '../../features/home/pages/Home.jsx';
import { Catalog } from '../../features/catalog/pages/Catalog.jsx';
import { ProductPage } from '../../features/product/pages/ProductPage.jsx';
import { Cart } from '../../features/cart/pages/Cart.jsx';
import { ProfilePage } from '../../features/profile/pages/Profile.jsx';
import { AuthPage } from '../../features/auth/pages/Auth.jsx';
import { AccessDenied } from '../../shared/pages/AccessDenied.jsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />

      {/* Защищенные маршруты для авторизованных пользователей */}
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