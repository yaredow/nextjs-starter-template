import Header from "../components";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="h-full w-full">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
