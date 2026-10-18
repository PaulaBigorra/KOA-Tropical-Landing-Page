export interface RoomType {
  id: string;
  name: string;
  price: number;
  totalAvailable: number; // Por defecto 5 por tipo
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roomTypeId: string;
  roomsCount: number;
  guestsCount: number;
  // Datos de tarjeta (opcionales por ser demo)
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Review {
  id: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}