import { serverFetch } from "@/lib/server-fetch";

export const paymentstatusByBookingId = async (bookingId: string) => {
    const res = await serverFetch.get(`/payment/booking/${bookingId}`);
    const data = await res.json();
    return data;
}