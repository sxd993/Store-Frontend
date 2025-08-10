import { useEffect } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';
import Header from './shared/components/Header/Header';
import Footer from './shared/components/Footer/Footer';
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