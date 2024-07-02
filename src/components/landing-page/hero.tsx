import Image from "next/image";
import Link from "next/link";

export default function Heros() {
  return (
    <section className="md:py-18 w-full py-12 lg:py-24">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            Build Faster
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:leading-normal lg:tracking-normal xl:text-[3.4rem] 2xl:text-[3.75rem]">
            Accelerate Your Web Development
          </h1>
          <p>
            This starter template provides a clean and modern foundation for
            building your next web application. It includes a responsive layout,
            reusable components, and a set of pre-styled elements to help you
            quickly create an engaging user interface.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
        <Image
          src="/images/placeholder.svg"
          width="550"
          height="550"
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
        />
      </div>
    </section>
  );
}
