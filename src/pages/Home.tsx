import {useEffect, useState} from 'react';
import AdmiralSearchForm from '../components/AdmiralSearchForm';
import {supabase} from '../lib/supabase';
import {Tour} from '../types';
import TourPreviewCard from '../components/TourPreviewCard';
import {Link} from 'react-router-dom';

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [hotTours, setHotTours] = useState<Tour[]>([]);

  useEffect(() => {
    // === Видео ===
    const videos = [
      'video_1.mp4',
      'video_2.mp4',
      'video_3.mp4',
      'video_4.mp4',
      'video_5.mp4',
      'video_6.mp4',
    ];

    let currentIndex = parseInt(
      localStorage.getItem('currentVideoIndex') || '-1'
    );
    if (currentIndex === -1) {
      currentIndex = Math.floor(Math.random() * videos.length);
      localStorage.setItem('currentVideoIndex', currentIndex.toString());
    }

    setCurrentVideo(`/videos/${videos[currentIndex]}`);

    const nextIndex = (currentIndex + 1) % videos.length;
    localStorage.setItem('currentVideoIndex', nextIndex.toString());

    // === Горящие туры ===
    const fetchHotTours = async () => {
      const today = new Date().toISOString();
      const {data} = await supabase
        .from('hot_tours')
        .select('*')
        .eq('is_hot', true)
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gte.${today}`)
        .limit(3);
      setHotTours(data || []);
    };

    fetchHotTours();
  }, []);

  return (
    <div className="relative">
      {/* Фоновое видео */}
      <div className="relative h-[70vh] overflow-hidden">
        {currentVideo && (
          <video
            key={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={currentVideo} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        )}

        {/* Тёмная подложка */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Контент поверх — только форма */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <AdmiralSearchForm />
        </div>
      </div>

      {/* Горящие туры под формой */}
      {hotTours.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔥 Горящие туры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotTours.map((tour) => (
              <TourPreviewCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/hot-tours"
              className="text-blue-600 hover:underline font-medium"
            >
              Смотреть все горящие туры →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
