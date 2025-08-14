import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute.jsx';

// Импорты страниц
import { Home } from '../../pages/Home';
import { Catalog } from '../../pages/Catalog';
import { Product } from '../../pages/Product';
import { Cart } from '../../pages/Cart';
import { Profile } from '../../pages/Profile';
import { AuthPage } from '../../pages/Auth';
import { AdminPage } from '../../pages/Admin';
import { AccessDenied } from '../../shared/pages/AccessDenied';


export const AppRouter = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />

      {/* Защищенные маршруты для авторизованных пользователей */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
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