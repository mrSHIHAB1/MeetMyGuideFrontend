export interface IBooking {
    _id?: string;                // Booking ObjectId (optional on creation)
    user: string;                // User ObjectId (who booked)
    tour: string;                // Tour ObjectId (which tour is booked)
    numberOfPeople: number;      // Total people in booking
    totalPrice: number;          // Calculated price
    bookingDate: string;         // ISO date string (when booking was made)
    status: "pending" | "confirmed" | "cancelled";  // current state
  }
  