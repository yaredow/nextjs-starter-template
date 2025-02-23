interface StripeLayoutProps {
  children: React.ReactNode;
}

function StripeLayout({ children }: StripeLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

export default StripeLayout;
