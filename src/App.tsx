import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import HotTours from './pages/HotTours';
import {FaPhone, FaMapMarkerAlt} from 'react-icons/fa';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HotTourDetail from './pages/HotTourDetail';
import {supabase} from './lib/supabase';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Логотип по центру, контакты справа */}
            <div className="flex items-start justify-between">
              <div className="w-1/4"></div>

              {/* Логотип */}
              <div className="flex-1 flex justify-center">
                <a href="/" className="focus:outline-none">
                  <img
                    src="/logo.png"
                    alt="Royal Tour"
                    className="h-20 w-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </a>
              </div>

              {/* Контакты */}
              <div className="w-1/4 flex flex-col items-end text-right">
                <a
                  href="tel:+37379555421"
                  className="flex items-center justify-end gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
                >
                  <FaPhone className="text-blue-600 flex-shrink-0" />
                  <span>+373 79 555 421</span>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Alecu+Russo+15,+Chișinău,+Moldova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-2 mt-1 text-blue-700 font-semibold hover:text-blue-900 transition"
                >
                  <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                  <span>Alecu Russo 15, et 4, of. 41</span>
                </a>
              </div>
            </div>

            {/* Меню */}
            <nav className="flex flex-wrap justify-center gap-1 md:gap-4 mt-4 pt-4 border-t border-gray-100">
              {[
                {name: 'Страны', href: '#'},
                {name: 'Новости', href: '#'},
                {name: 'Авиабилеты', href: '#'},
                {name: 'Страхование', href: '#'},
                {name: 'О нас', href: '#'},
                {name: 'Контакты', href: '#'},
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/hot-tours" element={<HotTours />} />
            <Route path="/hot-tours/:id" element={<HotTourDetail />} />

            {/* Админка */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Любой неизвестный путь → главная */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center py-6 mt-12">
          <p>
            <button
              onClick={async () => {
                const {data} = await supabase.auth.getSession();
                if (data.session) {
                  window.location.href = '/admin/dashboard';
                } else {
                  window.location.href = '/admin/login';
                }
              }}
              className="text-white hover:underline focus:outline-none"
              aria-label="Админка"
            >
              © {new Date().getFullYear()} Royal Tour. Все права защищены.
            </button>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
