import { serverFetch } from "@/lib/server-fetch"
import { getUserInfo } from "../auth/getUserInfo";

export async function getAllTour(queryString?: string) {
    const user = await getUserInfo();
    const travelerId = user.id;
    console.log(travelerId)
    try {
        const res = await serverFetch.get("/booking/traveler/my-bookings");
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
