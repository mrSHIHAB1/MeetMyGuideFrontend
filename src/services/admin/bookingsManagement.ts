"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";
import { IBooking } from "@/types/booking.interface";


export async function createBooking(_prevState: any, formData: FormData) {
  try {
    // Logged-in user = traveler
    let user = await getUserInfo();
    const travelerId = user.id;

    // Attach traveler to form data
    formData.append("traveler", travelerId);

  

    // Send formData directly to backend
    const response = await serverFetch.post("/booking/create", {
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    
    return {
      success: false,
      message: "Failed to create booking",
    };
  }
}

/**
 * GET ALL BOOKINGS (Admin)
 * API: GET /booking/all
 */
export async function getAllBookings(queryString?: string) {
  try {
    const endpoint = queryString ? `/booking/all?${queryString}` : "/booking/all";
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
export async function getFilteredBookings(queryString?: string) {
  try {
    const endpoint = queryString
      ? `/booking/filtered?${queryString}`
      : "/booking/filtered";

    const response = await serverFetch.get(endpoint);
    const result = await response.json();

    if (!result.success) {
      return { success: false, data: [], message: result.message };
    }

    return { success: true, data: result.data as IBooking[] };
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
/**
 * GET BOOKING BY ID
 * API: GET /booking/:id
 */
export async function getBookingById(id: string) {
  try {
    const response = await serverFetch.get(`/booking/${id}`)
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
 * UPDATE BOOKING STATUS
 * API: PATCH /booking/:id/accept or /booking/:id/decline or /booking/:id/complete
 */
export async function updateBookingStatus(id: string, action: 'accept' | 'decline' | 'complete') {
  try {
    const response = await serverFetch.patch(`/booking/${id}/${action}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Update booking status error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update booking status',
    };
  }
}

/**
 * DELETE BOOKING (Soft Delete)
 * API: DELETE /booking/:id
 */
export async function deleteBooking(id: string) {
  try {
    const response = await serverFetch.delete(`/booking/${id}`)
    const result = await response.json();
    return result;
  } catch (error: any) {
   
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

export const updateBookingAdmin = async (id: string, payload: any) => {
  try {
    const response = await serverFetch.patch(`/booking/${id}/update`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Update booking admin error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update booking admin',
    };
  }
}