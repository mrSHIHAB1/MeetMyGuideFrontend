"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo";


export async function createBooking(_prevState: any, formData: FormData) {
  try {
    // Logged-in user = traveler
    let user = await getUserInfo();
    const travelerId = user.id;

    // Attach traveler to form data
    formData.append("traveler", travelerId);

    console.log("Traveler ID added:", travelerId);

    // Send formData directly to backend
    const response = await serverFetch.post("/booking/create", {
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log("Booking Error:", error);
    return {
      success: false,
      message: "Failed to create booking",
    };
  }
}
