import {Tour} from '../types';

const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    title: 'Роскошный отдых на Мальдивах',
    country: 'Мальдивы',
    price: 1200,
    startDate: '2025-06-15',
    duration: 10,
    description: 'Белоснежные пляжи, дайвинг, спа и всё включено.',
  },
  {
    id: '2',
    title: 'Тур по Италии: Рим, Флоренция, Венеция',
    country: 'Италия',
    price: 850,
    startDate: '2025-05-20',
    duration: 7,
    description: 'Погрузитесь в культуру, кухню и историю Италии.',
  },
  {
    id: '3',
    title: 'Горнолыжный отдых в Альпах',
    country: 'Франция',
    price: 650,
    startDate: '2025-01-10',
    duration: 8,
    description: 'Лучшие склоны, уютные отели и горячий шоколад.',
  },
];

export const fetchTours = async (): Promise<Tour[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_TOURS;
};
