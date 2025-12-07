/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export async function createGuide(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("contactNumber") as string,
        password: formData.get("password") as string,
        picture: formData.get("file") as File,
    };

    const newFormData = new FormData()
    newFormData.append("data", JSON.stringify(validationPayload))
    newFormData.append("file", formData.get("file") as Blob)
    try {
        const response = await serverFetch.post("/user/register/guide", {
            body: newFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create guide error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create guide',
            formData: validationPayload
        };
    }
}

/**
 * GET ALL GUIDES
 * API: GET /user/all-users?queryParams
 */
export async function getGuides(queryString?: string) {
    try {
        const endpoint = queryString ? `/user/all-users?${queryString}` : "/user/all-users";
        const response = await serverFetch.get(endpoint);
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
 * GET GUIDE BY ID
 * API: GET /user/:id
 */
export async function getGuideById(id: string) {
    try {
        const response = await serverFetch.get(`/user/${id}`)
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
 * UPDATE GUIDE
 * API: PATCH /user/updateUsers/:id
 */
export async function updateGuide(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
    };

    try {
        const response = await serverFetch.patch(`/user/updateUsers/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validationPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update guide error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update guide',
            formData: validationPayload
        };
    }
}

/**
 * SOFT DELETE GUIDE
 * API: DELETE /user/:id
 */
export async function softDeleteGuide(id: string) {
    try {
        const response = await serverFetch.delete(`/user/${id}`)
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
 * HARD DELETE GUIDE
 * API: DELETE /user/:id
 */
export async function deleteGuide(id: string) {
    try {
        const response = await serverFetch.delete(`/user/${id}`)
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
