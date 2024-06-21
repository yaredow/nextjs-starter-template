export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      {children}
    </div>
  );
}
