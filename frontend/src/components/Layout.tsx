import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen font-sans bg-pattern">
      <header className="bg-surface/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10 shadow-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-accent-bright transition-colors"
          >
            Pet Shop
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-2xl hover:bg-white/10 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
