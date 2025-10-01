import {Tour} from '../types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({tour}: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
        <p className="text-gray-600 mt-1">{tour.country}</p>
        <p className="mt-3 text-gray-800 line-clamp-2">{tour.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">
            {tour.price.toLocaleString()} ₽
          </span>
          <span className="text-sm text-gray-500">{tour.duration} дней</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Подробнее
        </button>
      </div>
    </div>
  );
}
