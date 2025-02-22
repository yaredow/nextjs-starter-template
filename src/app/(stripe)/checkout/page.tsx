import { CheckoutButton } from "@/modules/stripe/ui/components/checkout-form";

function CheckoutPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <CheckoutButton />
    </div>
  );
}

export default CheckoutPage;
