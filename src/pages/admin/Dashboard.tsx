// Импортируем useState, useEffect, supabase и т.д.
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../../lib/supabase';

// Определяем тип тура
interface HotTour {
  id: string;
  title: string;
  country: string;
  price: number;
  description: string;
  images: string[]; // Массив URL фото
  cover_image: string; // URL главного фото
  expires_at: string | null;
  is_active: boolean;
}

export default function AdminDashboard() {
  const [hotTours, setHotTours] = useState<HotTour[]>([]);
  const [editingTour, setEditingTour] = useState<HotTour | null>(null);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList | null>(null); // Файлы, которые выбрал пользователь
  const [coverImage, setCoverImage] = useState(''); // URL главного фото
  const [expiresAt, setExpiresAt] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);
  const navigate = useNavigate();

  // Проверка авторизации
  useEffect(() => {
    const checkAuth = async () => {
      const {data} = await supabase.auth.getSession();
      if (!data?.session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Загрузка туров
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const {data, error} = await supabase
      .from('hot_tours')
      .select('*')
      .order('created_at', {ascending: false});
    if (!error) {
      setHotTours(data || []);
    }
  };

  const handleSave = async () => {
    let imageUrls: string[] = [];

    // Загрузка фото (если есть)
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        // Генерируем уникальное имя файла
        const fileName = `${Date.now()}_${file.name}`;
        // Загружаем файл в бакет tour-images
        const {error: uploadError} = await supabase.storage
          .from('tour-images') // ← название бакета
          .upload(fileName, file);

        // Если ошибка — пропускаем
        if (uploadError) {
          console.error('Ошибка загрузки:', uploadError);
          continue;
        }

        // Получаем публичный URL файла
        const {data} = supabase.storage
          .from('tour-images')
          .getPublicUrl(fileName);
        // Добавляем URL в массив
        imageUrls.push(data.publicUrl);
      }
    }

    // Определяем дату окончания
    const expires_at = isTimerEnabled ? `${expiresAt}T23:59:59` : null;

    if (editingTour) {
      // Обновление существующего тура
      await supabase
        .from('hot_tours')
        .update({
          title,
          country,
          price: Number(price),
          description,
          // Сохраняем все фото (старые + новые)
          images:
            imageUrls.length > 0
              ? [...editingTour.images, ...imageUrls]
              : editingTour.images,
          // Главное фото — то, что выбрал пользователь
          cover_image: coverImage || imageUrls[0] || '',
          expires_at,
          is_active: isActive,
        })
        .eq('id', editingTour.id);
    } else {
      // Создание нового тура
      await supabase.from('hot_tours').insert([
        {
          title,
          country,
          price: Number(price),
          description,
          images: imageUrls, // Все загруженные фото
          cover_image: imageUrls[0] || '', // Первое фото — главное
          is_hot: true,
          expires_at,
          is_active: isActive,
        },
      ]);
    }

    // Обновляем список туров
    fetchTours();
    // Сбрасываем форму
    resetForm();
  };

  const resetForm = () => {
    setEditingTour(null);
    setTitle('');
    setCountry('');
    setPrice('');
    setDescription('');
    setImages(null);
    setCoverImage('');
    setExpiresAt('');
    setIsActive(true);
    setIsTimerEnabled(false);
  };

  const handleEdit = (tour: HotTour) => {
    setEditingTour(tour);
    setTitle(tour.title);
    setCountry(tour.country);
    setPrice(String(tour.price));
    setDescription(tour.description);
    // Устанавливаем главное фото
    setCoverImage(tour.cover_image || '');
    setExpiresAt(tour.expires_at ? tour.expires_at.split('T')[0] : '');
    setIsActive(tour.is_active);
    setIsTimerEnabled(!!tour.expires_at);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить тур?')) {
      await supabase.from('hot_tours').delete().eq('id', id);
      fetchTours();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Админка — Горящие туры</h1>

      {/* Форма добавления/редактирования */}
      <div className="bg-gray-100 p-4 rounded mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingTour
            ? `Редактирование: ${editingTour.title}`
            : 'Добавить новый тур'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название *"
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
            placeholder="Цена *"
            className="p-2 border rounded"
            required
          />
          <div>
            <label className="block mb-1 text-sm">
              <input
                type="checkbox"
                checked={isTimerEnabled}
                onChange={(e) => setIsTimerEnabled(e.target.checked)}
                className="mr-2"
              />
              Установить дату окончания
            </label>
            {isTimerEnabled && (
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="p-2 border rounded w-full mt-1"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Фото (можно несколько)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
              className="p-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">
              Главное фото (выбор из загруженных)
            </label>
            {/* Если есть редактируемый тур и у него есть фото — показываем селект */}
            {editingTour?.images && editingTour.images.length > 0 && (
              <select
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Автоматически (первое)</option>
                {editingTour.images.map((url, idx) => (
                  <option key={idx} value={url}>
                    Фото {idx + 1}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mr-2"
              />
              Активен
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingTour ? 'Сохранить' : 'Добавить'}
            </button>
            {editingTour && (
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Отмена
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Список туров */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Существующие туры</h2>
        <div className="space-y-3">
          {hotTours.map((tour) => (
            <div
              key={tour.id}
              className="p-3 bg-white border rounded flex justify-between items-center"
            >
              <div>
                <strong>{tour.title}</strong> — {tour.country} — {tour.price} ₽
                {tour.expires_at && (
                  <span className="ml-2 text-sm text-red-600">
                    До {new Date(tour.expires_at).toLocaleDateString()}
                  </span>
                )}
                {!tour.is_active && (
                  <span className="ml-2 text-sm text-gray-500">
                    [неактивен]
                  </span>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(tour)}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(tour.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
