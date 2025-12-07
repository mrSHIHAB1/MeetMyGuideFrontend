export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface IBooking {
  _id?: string;
  id?: string; // Backward compatibility
  tourist: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  } | string;
  guide: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  } | string;
  tour: {
    _id: string;
    title: string;
    price: number;
  } | string;
  requestedDate: string;
  requestedTime?: string;
  status: BookingStatus;
  numberOfPeople?: number;
  specialRequests?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}