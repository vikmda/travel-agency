import {
  FaPlane,
  FaBus,
  FaUmbrellaBeach,
  FaHotel,
  FaMapMarkedAlt,
  FaShieldAlt,
} from 'react-icons/fa';

export default function AdmiralMenu() {
  const menuItems = [
    {name: 'Туры', icon: <FaUmbrellaBeach />, href: '#'},
    {name: 'Отели', icon: <FaHotel />, href: '#'},
    {name: 'Экскурсии', icon: <FaMapMarkedAlt />, href: '#'},
    {name: 'Автобус', icon: <FaBus />, href: '#'},
    {name: 'Авиабилеты', icon: <FaPlane />, href: '#'},
    {name: 'Страхование', icon: <FaShieldAlt />, href: '#'},
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-blue-50 rounded-xl shadow hover:shadow-md transition-all duration-200 group"
          >
            <div className="text-blue-600 group-hover:text-blue-800 transition-colors">
              {item.icon}
            </div>
            <span className="mt-2 text-sm font-medium text-blue-700 group-hover:text-blue-900 text-center px-1">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
