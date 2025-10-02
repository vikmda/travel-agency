import {Tour} from '../types';
import {Link} from 'react-router-dom';

interface TourPreviewCardProps {
  tour: Tour;
}

export default function TourPreviewCard({tour}: TourPreviewCardProps) {
  return (
    <Link to={`/hot-tours/${tour.id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-md transition">
        {tour.cover_image ? (
          <img
            src={tour.cover_image}
            alt={tour.title}
            className="w-full h-40 object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-xl">
            <span className="text-gray-500">Нет фото</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900">{tour.title}</h3>
          <p className="text-gray-600">{tour.country}</p>
          <p className="mt-2 text-lg font-semibold text-blue-600">
            {tour.price.toLocaleString()} ₽
          </p>
        </div>
      </div>
    </Link>
  );
}
