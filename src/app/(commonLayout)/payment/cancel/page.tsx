"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <XCircle className="mx-auto h-20 w-20 text-red-500" />
        <h1 className="text-3xl font-bold mt-6 text-gray-800">Payment Cancelled</h1>
        <p className="mt-4 text-gray-600">
          Your payment was not completed. You can go back and try again.
        </p>

        <Button
          onClick={() => router.push('/tourist/mybookings')}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white w-full"
        >
          ← Go Back
        </Button>
      </div>
    </div>
  );
}
