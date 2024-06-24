import CardWrapper from "@/components/auth/CardWrapper";
import ContactUsForm from "@/components/form/contact-us-form";

export default function Page() {
  return (
    <CardWrapper
      title="Contact us"
      description="We're here to help! Fill out the form below and we'll get back to you as soon as possible. Whether you have questions, feedback, or need assistance, we'd love to hear from you."
      backButtonHref="/"
      backButtonLabel="Go back to home"
      showSocial={false}
      isLogin={false}
    >
      <ContactUsForm />
    </CardWrapper>
  );
}
