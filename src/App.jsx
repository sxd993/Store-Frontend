import { useEffect } from 'react';
import { useAuth } from './features/auth';
import { Header, Footer } from './shared/ui';
import { AppRouter } from './app/router';

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