import CardWrapper from "@/components/auth/CardWrapper";
import SignupForm from "@/components/form/signup-form";

export const metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <CardWrapper
      title="Sign up"
      description="Join us! Create your account to get started and enjoy exclusive benefits."
      backButtonHref="/auth/signin"
      backButtonLabel="Back to Sign in"
      showSocial={true}
    >
      <SignupForm />
    </CardWrapper>
  );
}
