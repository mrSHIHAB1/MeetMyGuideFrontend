"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { updateBookingAdmin } from "@/services/admin/bookingsManagement";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState("Checking payment...");

    useEffect(() => {
        if (!sessionId) return;

        async function confirmPayment() {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/payment/confirm/${sessionId}`, {
                    method: "POST",
                });

                const data = await res.json();

                if (res.ok) {
                    setStatus("🎉 Payment Successful! Status updated to PAID.");
                } else {
                    setStatus("❌ Payment confirmation failed: " + data.message);
                }
            } catch (error) {
                setStatus("⚠ Server error");
                console.error(error);
            }

        }

        confirmPayment();
    }, [sessionId]);

    return (
        <div style={{ padding: "20px", fontSize: "20px" }}>
            <h1>Payment Status</h1>
            <p>{status}</p>
        </div>
    );
}
