import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute.jsx';

// Импорты страниц
import { HomePage } from '../../pages/HomePage.jsx';
import { CatalogPage } from '../../pages/CatalogPage.jsx';
import { ProductPage } from '../../pages/ProductPage.jsx';
import { CartPage } from '../../pages/CartPage.jsx';
import { ProfilePage } from '../../pages/ProfilePage.jsx';
import { AuthPage } from '../../pages/AuthPage.jsx';
import { AdminPage } from '../../pages/AdminPage.jsx';
import { AccessDenied } from '../../shared/pages/AccessDenied';


export const AppRouter = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />

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
            <AdminPage />
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