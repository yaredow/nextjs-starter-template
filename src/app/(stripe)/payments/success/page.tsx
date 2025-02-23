"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Session {
  id: string;
  amount_total: number;
  currency: string;
}

function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch session details from the API
    if (sessionId) {
      fetch(`/api/stripe/get-session?session_id=${sessionId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch session: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSession(data.session);
          }
        })
        .catch((err) => {
          console.error("Error fetching session:", err);
          setError("Failed to load session details.");
        });
    } else {
      setError("Missing session ID.");
    }

    // Redirect to the home page after a delay
    const timer = setTimeout(() => {
      router.push("/"); // Replace "/" with your desired home page URL
    }, 5000); // Redirect after 5 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router, sessionId]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Payment Successful!</h1>
        <p className="mb-2">Thank you for your purchase.</p>

        {error && <div className="mb-2 text-red-500">Error: {error}</div>}

        {session && (
          <div className="mb-4">
            <p>Session ID: {session.id}</p>
            <p>
              Total Amount:
              {(session.amount_total / 100).toLocaleString("en-US", {
                style: "currency",
                currency: session.currency,
              })}
            </p>
            {/* Display other session details as needed */}
          </div>
        )}

        <p>You will be redirected to the home page shortly...</p>
      </div>
    </div>
  );
}

export default SuccessPage;
