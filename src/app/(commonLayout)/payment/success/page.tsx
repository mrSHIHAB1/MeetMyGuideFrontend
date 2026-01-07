"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const API_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    if (!sessionId) return;

    async function confirmPayment() {
      try {
        const res = await fetch(`${API_BASE}/payment/confirm/${sessionId}`, {
          method: "POST",
        });

        const data = await res.json();

        setStatus(
          res.ok
            ? " Payment Successful! Status updated to PAID."
            : `Payment failed: ${data.message}`
        );
      } catch (error) {
        setStatus("⚠ Server error");
      
      }
    }

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
      <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
      <h1 className="text-3xl font-bold mt-6 text-gray-800">{status}</h1>
      <p className="mt-4 text-gray-600">
        Thank you for your payment! You can view your bookings below.
      </p>

      <Button
        onClick={() => router.push("/tourist/mybookings")}
        className="mt-8 bg-green-500 hover:bg-green-600 text-white w-full"
      >
        View My Bookings
      </Button>
    </div>
  );
}

// ----------------------
// Main Page
// ----------------------
export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <Suspense fallback={<div className="text-center p-6">Processing payment...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
