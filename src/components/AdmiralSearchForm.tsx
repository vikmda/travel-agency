import {
  FaPlane,
  FaBus,
  FaUmbrellaBeach,
  FaHotel,
  FaMapMarkedAlt,
} from 'react-icons/fa';

export default function AdmiralSearchForm() {
  return (
    <div className="bg-blue-600 text-white py-6">
      {/* Вкладки */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
          {[
            {name: 'Пакеты', icon: <FaUmbrellaBeach />, active: true},
            {name: 'Отели', icon: <FaHotel />, active: false},
            {name: 'Экскурсии', icon: <FaMapMarkedAlt />, active: false},
            {name: 'Автобус', icon: <FaBus />, active: false},
            {name: 'Авиабилеты', icon: <FaPlane />, active: false},
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition ${
                item.active
                  ? 'bg-white text-blue-600'
                  : 'bg-transparent hover:bg-blue-700'
              }`}
            >
              {item.icon}
              {item.name}
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
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
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
                placeholder="Введите страну, курорт или отель"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>

            {/* Пакет */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Пакет</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>Выберите местность...</option>
              </select>
            </div>

            {/* Дата */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Дата</label>
              <input
                type="text"
                placeholder="09.10.2025"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>

            {/* Ночи */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Ночи</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>3</option>
                <option>5</option>
                <option>7</option>
              </select>
            </div>

            {/* Взрослые */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">
                Взрослые
              </label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>2</option>
                <option>1</option>
                <option>3</option>
              </select>
            </div>

            {/* Дети */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Дети</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>

            {/* Кнопка Поиск */}
            <div className="col-span-1 md:col-span-1 flex items-end">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={(e) => e.preventDefault()} // Заглушка — не отправляет форму
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
