interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      {children}
    </div>
  );
};
