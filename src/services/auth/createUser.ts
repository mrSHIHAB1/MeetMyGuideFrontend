"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function register(_currentState: any, formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      bio: formData.get("bio"),
      dailyrate: Number(formData.get("dailyrate")),
      spokenLanguages: String(formData.get("spokenLanguages"))
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      travelpreferences: String(formData.get("expertise"))
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));

    const file = formData.get("file") as File | null;
    if (file) fd.append("file", file);

    // Call backend API
    const response = await serverFetch.post("/user/register/guide", { body: fd });

    // Parse JSON from the response
    const result = await response.json();


    // Now you can access success/message
    if (result.success) {
      return { success: true, message: "Account created successfully!" };
    } else {
      return { success: false, message: result.message || "Registration failed." };
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
}
