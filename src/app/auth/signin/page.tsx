import CardWrapper from "@/components/auth/CardWrapper";
import SigninForm from "@/components/form/signin-form";

export const metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <CardWrapper
      title="Sign in"
      description="Welcome! Please sign in to access your account and explore our services."
      backButtonHref="/"
      backButtonLabel="Go back home"
      showSocial={true}
      isLogin={true}
    >
      <SigninForm />
    </CardWrapper>
  );
}
