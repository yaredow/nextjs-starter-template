interface StripeLayoutProps {
  children: React.ReactNode;
}

function StripeLayout({ children }: StripeLayoutProps) {
  return <div>{children}</div>;
}

export default StripeLayout;
