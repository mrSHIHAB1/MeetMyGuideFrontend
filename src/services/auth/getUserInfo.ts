/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {
        const response = await serverFetch.post("/auth/me");
        const result = await response.json();

        if (!result.success) {
            throw new Error("Failed to fetch user info");
        }

        // Access token from cookies
        const accessToken = await getCookie("accessToken");
        if (!accessToken) {
            throw new Error("No access token found");
        }

        const verified = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        // Build consistent user object
        userInfo = {
            id: result.data.id,
            name: verified.name || result.data.email.split("@")[0],
            email: result.data.email,
            role: result.data.role
        };

        return userInfo;

    } catch (error) {
     

        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "TOURIST",
        };
    }
};
