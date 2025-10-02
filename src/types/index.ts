export interface Tour {
  id: string;
  title: string;
  country: string;
  price: number;
  startDate: string;
  duration: number;
  description: string;
  images?: string[];
  cover_image?: string;
  expires_at?: string | null;
}
