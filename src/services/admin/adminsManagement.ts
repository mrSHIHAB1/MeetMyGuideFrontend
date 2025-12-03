/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

export async function createAdmin(_prevState: any, formData: FormData) {
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


        const response = await serverFetch.post("/user/register/admin", {
            body: newFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create admin error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create admin',
            formData: validationPayload
        };
    }
}

/**
 * GET ALL ADMINS
 * API: GET /admin?queryParams
 */
export async function getAdmins(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/all-users${queryString ? `?${queryString}` : ""}`);
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
 * GET ADMIN BY ID
 * API: GET /admin/:id
 */
export async function getAdminById(id: string) {
    try {
        const response = await serverFetch.get(`/admin/${id}`)
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
 * UPDATE ADMIN
 * API: PATCH /admin/:id
 */
export async function updateAdmin(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
    };

    /*
    // Server-side validation
        const validation = updateAdminZodSchema.safeParse(validationPayload);
        if (!validation.success) {
            const errors = validation.error.issues.map((err: any) => ({
                field: err.path[0] as string,
                message: err.message,
            }));
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
                errors,
            };
        }
    */

    try {
        const response = await serverFetch.patch(`/admin/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validationPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update admin error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update admin',
            formData: validationPayload
        };
    }
}

/**
 * SOFT DELETE ADMIN
 * API: DELETE /admin/soft/:id
 */
export async function softDeleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/admin/soft/${id}`)
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
 * HARD DELETE ADMIN
 * API: DELETE /admin/:id
 */
export async function deleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/admin/${id}`)
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
