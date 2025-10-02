import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {supabase} from '../lib/supabase';
import {Tour} from '../types';

export default function HotTourDetail() {
  const {id} = useParams<{id: string}>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      const {data} = await supabase
        .from('hot_tours')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setTour({
          id: data.id,
          title: data.title,
          country: data.country || 'Не указано',
          price: Number(data.price),
          startDate: new Date().toISOString(),
          duration: 7,
          description: data.description || '',
          cover_image: data.cover_image || '',
        });
      }
      setLoading(false);
    };

    if (id) fetchTour();
  }, [id]);

  if (loading) return <div className="p-8">Загрузка...</div>;
  if (!tour) return <div className="p-8">Тур не найден</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Назад к горящим турам
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        {tour.cover_image && (
          <img
            src={tour.cover_image}
            alt={tour.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
        <p className="text-xl text-blue-600 font-semibold mb-2">
          {tour.price.toLocaleString()} ₽
        </p>
        <p className="text-gray-600 mb-4">{tour.country}</p>
        <div className="prose max-w-none">
          <p>{tour.description}</p>
        </div>
      </div>
    </div>
  );
}
