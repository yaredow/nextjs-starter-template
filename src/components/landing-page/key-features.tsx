import {
  AccessibilityIcon,
  CodeIcon,
  CreditCardIcon,
  LayoutTemplateIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";

export default function KeyFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              This Next.js starter template comes packed with powerful features
              to kickstart your project.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <LockIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Fully written authentication
              </h3>
              <p className="text-muted-foreground">
                Our starter template comes with a fully-featured authentication
                system powered by auth.js.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <LayoutTemplateIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Landing page with hero and features
              </h3>
              <p className="text-muted-foreground">
                Get started with a beautifully designed landing page, complete
                with a hero section and feature highlights.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Integrated payment methods
              </h3>
              <p className="text-muted-foreground">
                Easily integrate popular payment gateways like Stripe and PayPal
                into your application.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MailIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Pre-written email templates
              </h3>
              <p className="text-muted-foreground">
                Save time with our pre-written email templates for welcome
                messages, password resets, and more.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <AccessibilityIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Responsive and accessible design
              </h3>
              <p className="text-muted-foreground">
                Our starter template is built with a mobile-first approach and
                adheres to accessibility best practices.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CodeIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Developer-friendly codebase
              </h3>
              <p className="text-muted-foreground">
                Our codebase follows industry best practices and is easy to
                understand and extend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
