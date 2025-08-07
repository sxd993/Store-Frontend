// frontend/src/App.jsx - Интеграция с вашим существующим приложением
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from '././components/Auth/ProtectedRoute/ProtectedRoute.jsx';

// Ваши существующие компоненты
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import Home from '../src/pages/Home/Home';
import About from '../src/pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';

// Auth страницы
import { LoginPage } from './pages/Login/Login.jsx';
import { RegisterPage } from './pages/Register/Register.jsx';

// React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 1,
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              {/* Ваши существующие роуты */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductPage />} />

              {/* Защищенный роут корзины (только для авторизованных) */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              {/* Auth роуты */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;