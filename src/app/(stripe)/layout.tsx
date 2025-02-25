import StripeLayout from "@/modules/stripe/ui/layouts/stripe-layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <StripeLayout>{children}</StripeLayout>;
}

export default Layout;
