import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../../lib/supabase';

export default function AdminDashboard() {
  const [hotTours, setHotTours] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Проверка авторизации
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
  }, [navigate]);

  // Загрузка туров
  useEffect(() => {
    const fetchTours = async () => {
      const {data} = await supabase.from('hot_tours').select('*');
      setHotTours(data || []);
    };
    fetchTours();
  }, []);

  const handleAddTour = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase
      .from('hot_tours')
      .insert([
        {title, country, price: Number(price), description, is_hot: true},
      ]);
    // Сброс формы
    setTitle('');
    setCountry('');
    setPrice('');
    setDescription('');
    // Обновить список
    const {data} = await supabase.from('hot_tours').select('*');
    setHotTours(data || []);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Админка — Горящие туры</h1>

      {/* Форма добавления */}
      <form onSubmit={handleAddTour} className="bg-gray-100 p-4 rounded mb-8">
        <h2 className="text-lg font-semibold mb-4">Добавить тур</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
            className="p-2 border rounded"
            required
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Страна"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Цена"
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Добавить
          </button>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          className="w-full p-2 border rounded mt-2"
          rows={2}
        />
      </form>

      {/* Список туров */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Существующие туры</h2>
        <div className="space-y-2">
          {hotTours.map((tour) => (
            <div
              key={tour.id}
              className="p-3 bg-white border rounded flex justify-between"
            >
              <div>
                <strong>{tour.title}</strong> — {tour.country} — {tour.price} ₽
              </div>
              <button
                onClick={async () => {
                  if (confirm('Удалить?')) {
                    await supabase.from('hot_tours').delete().eq('id', tour.id);
                    setHotTours(hotTours.filter((t) => t.id !== tour.id));
                  }
                }}
                className="text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
