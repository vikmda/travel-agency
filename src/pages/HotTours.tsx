import {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';
import TourCard from '../components/TourCard';
import {Tour} from '../types';

export default function HotTours() {
  const [hotTours, setHotTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotTours = async () => {
      const today = new Date().toISOString();

      const {data, error} = await supabase
        .from('hot_tours')
        .select('*')
        .eq('is_hot', true)
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gte.${today}`);

      if (error) {
        console.error('Ошибка:', error);
        setLoading(false);
        return;
      }

      const tours: Tour[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        country: item.country || 'Не указано',
        price: Number(item.price),
        startDate: new Date().toISOString(),
        duration: 7,
        description: item.description || '',
        // Новые поля для TourCard
        images: item.images || [],
        cover_image: item.cover_image || item.images?.[0] || '',
        expires_at: item.expires_at,
      }));

      setHotTours(tours);
      setLoading(false);
    };

    fetchHotTours();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Загрузка горящих туров...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🔥 Горящие туры</h1>
      {hotTours.length === 0 ? (
        <p className="text-gray-600 text-lg">Нет доступных горящих туров</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
