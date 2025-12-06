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