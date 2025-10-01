import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Добро пожаловать в Royal Tour!
      </h1>
      <p className="text-xl text-gray-700 mb-10">
        Лучшие туры по всему миру — подберём идеальный отдых именно для вас.
      </p>
      <Link
        to="/tours"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Посмотреть все туры
      </Link>
    </div>
  );
}
