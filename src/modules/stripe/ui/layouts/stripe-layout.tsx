import React from "react";

interface StripeLayoutProps {
  children: React.ReactNode;
}

function StripeLayout({ children }: StripeLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg p-6 shadow-md">
        {children}
      </div>
    </div>
  );
}

export default StripeLayout;
