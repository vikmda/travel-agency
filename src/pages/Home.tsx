import {useEffect, useState} from 'react';
import AdmiralMenu from '../components/AdmiralMenu';
import AdmiralSearchForm from '../components/AdmiralSearchForm';
export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<string>('');

  useEffect(() => {
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

    const sendVisit = async () => {
      const country =
        Intl.DateTimeFormat().resolvedOptions().timeZone?.split('/')[0] ||
        'Unknown';
      const referrer = document.referrer || 'direct';
      const userAgent = navigator.userAgent;

      await fetch('/api/visit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({country, referrer, userAgent}),
      });
    };

    sendVisit();
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <AdmiralSearchForm />
        </div>
        {/* Тёмная подложка */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Контент поверх — ТОЛЬКО МЕНЮ */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <AdmiralMenu />
        </div>
      </div>

      {/* Дополнительный контент (можно оставить или убрать) */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Здесь может быть дополнительный текст, преимущества, отзывы и т.д.
          </p>
        </div>
      </div>
    </div>
  );
}
