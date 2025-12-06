import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";

export interface TourFilterParams {
    destination?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export async function getAllToursByFilter(filters?: TourFilterParams) {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();

        if (filters?.destination) {
            queryParams.append('destination', filters.destination);
        }
        if (filters?.category) {
            queryParams.append('category', filters.category);
        }
        if (filters?.minPrice !== undefined) {
            queryParams.append('minPrice', filters.minPrice.toString());
        }
        if (filters?.maxPrice !== undefined) {
            queryParams.append('maxPrice', filters.maxPrice.toString());
        }

        const queryString = queryParams.toString();
        const endpoint = queryString
            ? `/tour/filter?${queryString}`
            : '/tour/filter';

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
export async function getTourById(id: string) {
    try {
        const response = await serverFetch.get(`/tour/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        };
    }
}

export async function createTour(_prevState: any, formData: FormData) {
    let user = await getUserInfo();
    user = user.id;
    console.log(user)
    formData.append("guide", user)
    console.log(formData)
    try {
        const response = await serverFetch.post("/tour/create", {
            body: formData, // VERY IMPORTANT
        });

        const result = await response.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: "Failed to create tour",
        };
    }
}
export async function updateTour(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        itinerary: formData.get("itinerary") as string,
        fee: Number(formData.get("fee")),
        duration: Number(formData.get("duration")),
        meetingPoint: formData.get("meetingPoint") as string,
        maxGroupSize: Number(formData.get("maxGroupSize")),
        status: formData.get("status") as string,
    };

    try {
        const response = await serverFetch.patch(`/tour/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validationPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update tour error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development" ? error.message : "Failed to update tour",
            formData: validationPayload,
        };
    }
}