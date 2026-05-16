import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-red text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
