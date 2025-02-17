interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default HomeLayout;
