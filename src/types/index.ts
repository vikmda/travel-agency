export interface Tour {
  id: string; // uuid приходит как строка
  title: string;
  country: string;
  price: number;
  startDate: string; // пока фиксированная дата
  duration: number; // пока фиксировано
  description: string;
}
