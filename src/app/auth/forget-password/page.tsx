import CardWrapper from "@/components/auth/CardWrapper";
import ForgetPasswordForm from "@/components/form/forget-passowrd-form";

export const metadata = {
  title: "Forget Password",
};

export default function Page() {
  return (
    <CardWrapper
      title="Forget Passowrd"
      description="Forgot your password? No worries! Send us your email to reset it and regain access to your account."
      showSocial={false}
      backButtonHref="/auth/signin"
      backButtonLabel="Go back to Signin"
    >
      <ForgetPasswordForm />
    </CardWrapper>
  );
}
