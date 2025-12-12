import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";

export interface BookingFilterParams {
    status?: string;
}

export const getGuideBookings = async (filters?: BookingFilterParams) => {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();

        if (filters?.status) {
            queryParams.append('status', filters.status);
        }

        const queryString = queryParams.toString();
        const endpoint = queryString
            ? `/booking/guide/my-bookings?${queryString}`
            : '/booking/guide/my-bookings';

        const res = await serverFetch.get(endpoint);
        const result = await res.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export const acceptBooking = async (bookingId: string) => {
    try {
        const res = await serverFetch.patch(`/booking/${bookingId}/accept`, {
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to accept booking'}`
        };
    }
}
export const completeBooking = async (bookingId: string) => {
    try {
        const res = await serverFetch.patch(`/booking/${bookingId}/complete`, {
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to complete booking'}`
        };
    }
}
export const declineBooking = async (bookingId: string) => {
    try {
        const res = await serverFetch.patch(`/booking/${bookingId}/decline`, {
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to decline booking'}`
        };
    }
}
export const fetchGuideReviews = async (guideId: string) => {
    const res = await serverFetch.get(`/review/guide/${guideId}`);
    const data = await res.json();
  
    return {
      avgRating: data?.meta?.avgRating || 0,
      count: data?.meta?.count || 0,
      reviews: data?.data || []
    };
  };
  