import { useEffect } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';
import Header from './app/layout/Header/Header';
import Footer from './app/layout/Footer/Footer';
import { AppRouter } from './app/router/AppRouter';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;