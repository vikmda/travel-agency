import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import HotTours from './pages/HotTours';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Royal Tour</h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/hot-tours" element={<HotTours />} />{' '}
            {/* ← ЭТА СТРОКА */}
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center py-6 mt-12">
          <p>© {new Date().getFullYear()} Royal Tour. Все права защищены.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
