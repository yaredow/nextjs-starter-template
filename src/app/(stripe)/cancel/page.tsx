"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after a delay
    const timer = setTimeout(() => {
      router.push("/"); // Replace "/" with your desired home page URL
    }, 3000); // Redirect after 3 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Payment Cancelled</h1>
        <p>Your payment has been cancelled.</p>
        <p>You will be redirected to the home page shortly...</p>
      </div>
    </div>
  );
}

export default CancelPage;
