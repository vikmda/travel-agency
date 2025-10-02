import {useState} from 'react';
import {
  FaPlane,
  FaBus,
  FaUmbrellaBeach,
  FaHotel,
  FaMapMarkedAlt,
} from 'react-icons/fa';

export default function AdmiralSearchForm() {
  // Активная вкладка: 'packages', 'hotels', 'excursions', 'bus', 'avia'
  const [activeTab, setActiveTab] = useState<
    'packages' | 'hotels' | 'excursions' | 'bus' | 'avia'
  >('packages');

  // Состояния полей формы
  const [departure, setDeparture] = useState('Кишинёв');
  const [destination, setDestination] = useState('');
  const [packageType, setPackageType] = useState('Выберите местность...');
  const [checkInDate, setCheckInDate] = useState('09.10.2025');
  const [nights, setNights] = useState('3');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  const tabs = [
    {id: 'packages', name: 'Пакеты', icon: <FaUmbrellaBeach />},
    {id: 'hotels', name: 'Отели', icon: <FaHotel />},
    {id: 'excursions', name: 'Экскурсии', icon: <FaMapMarkedAlt />},
    {id: 'bus', name: 'Автобус', icon: <FaBus />},
    {id: 'avia', name: 'Авиабилеты', icon: <FaPlane />},
  ];

  return (
    <div className="bg-blue-600 text-white py-6">
      {/* Вкладки */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600'
                  : 'bg-transparent hover:bg-blue-700'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Форма поиска */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-2">
            {/* Город отправления */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">
                Город отправления
              </label>
              <select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Кишинёв</option>
                <option>Бухарест</option>
                <option>Яссы</option>
              </select>
            </div>

            {/* Куда */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Куда</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Страна, курорт или отель"
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Пакет */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Пакет</label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Выберите местность...</option>
                <option>Турция</option>
                <option>Египет</option>
                <option>ОАЭ</option>
              </select>
            </div>

            {/* Дата */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Дата</label>
              <input
                type="text"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                placeholder="09.10.2025"
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Ночи */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Ночи</label>
              <select
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Взрослые */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">
                Взрослые
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Дети */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Дети</label>
              <select
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Кнопка Поиск */}
            <div className="col-span-1 md:col-span-1 flex items-end">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    `Поиск запущен!\nВкладка: ${activeTab}\nНаправление: ${
                      destination || '—'
                    }`
                  );
                }}
              >
                Начать поиск
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
