import { serverFetch } from "@/lib/server-fetch";

export async function FeatuerdTour() {
    try {
        const res = await serverFetch.get('/booking/most-booked-tours')
        const data = await res.json();
        return data;
    }
    catch (error: any) {

        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to accept booking'}`
        };
    }

}
export async function FeaturedGuide() {
    try {
        const res = await serverFetch.get('/review/featured/guides')
        const data = await res.json();
        return data;
    }
    catch (error: any) {

        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to accept booking'}`
        };
    }

}