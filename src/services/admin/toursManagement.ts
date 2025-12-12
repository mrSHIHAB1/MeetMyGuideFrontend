/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";

/**
 * GET ALL TOURS (Admin) with filtering
 * API: GET /tour/filter
 */
export async function getAllTours(queryString?: string) {
    try {
        const endpoint = queryString ? `/tour/filter?${queryString}` : "/tour/filter";
        const response = await serverFetch.get(endpoint);
        const result = await response.json();
        return result;
    } catch (error: any) {
    
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * GET TOUR BY ID
 * API: GET /tour/:id
 */
export async function getTourById(id: string) {
    try {
        const response = await serverFetch.get(`/tour/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * CREATE TOUR
 * API: POST /tour/create
 * this for guide
 */
export async function createTour(_prevState: any, formData: FormData) {
    const userid = (await getUserInfo())?.id;
    formData.append("guide", userid!);
    try {
        const response = await serverFetch.post("/tour/create", {
            body: formData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create tour error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create tour',
        };
    }
}
export async function createTouradmin(_prevState: any, formData: FormData) {

    try {
        const response = await serverFetch.post("/tour/create", {
            body: formData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create tour error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create tour',
        };
    }
}
/**
 * UPDATE TOUR
 * API: PATCH /tour/:id
 */
export async function updateTour(id: string, _prevState: any, formData: FormData) {
    try {
        const response = await serverFetch.patch(`/tour/${id}`, {
            body: formData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update tour error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update tour',
        };
    }
}

/**
 * DELETE TOUR (Deactivate - Soft Delete)
 * API: PATCH /tour/deactivate/:id
 */
export async function deleteTour(id: string) {
    try {
        const response = await serverFetch.patch(`/tour/deactivate/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
