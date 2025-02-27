import { ArrowRightIcon, Github } from "lucide-react";
import type React from "react";
import Link from "next/link";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { BlurFade } from "@/components/magicui/blur-fade";
import { technologies } from "@/modules/home/constants";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/configs/site.config";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <BlurFade delay={BLUR_FADE_DELAY * 1}>
        <section className="py-12 md:py-24">
          <div className="container mx-auto max-w-3xl space-y-8 px-4 text-center">
            <div className="z-10 flex items-center justify-center">
              <div
                className={cn(
                  "group rounded-full text-base transition-all ease-in hover:cursor-pointer",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 transition ease-out hover:text-blue-600 hover:duration-300 dark:border-blue-800/30 dark:bg-blue-900 hover:dark:text-blue-400">
                  <span>✨ Feature rich Next.js template</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h1 className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-900 bg-clip-text font-montserrat text-5xl font-bold tracking-tight text-transparent dark:from-blue-50 dark:via-blue-400 dark:to-blue-200 sm:text-4xl md:text-6xl">
                Next Starter Template
              </h1>
            </BlurFade>

            <BlurFade
              delay={BLUR_FADE_DELAY * 4}
              className="text-center font-sans text-lg text-muted-foreground"
            >
              Kickstart your Next.js project with a clean and scalable
              foundation. This template follows a module-based file structure,
              ensuring maintainability and ease of expansion. With a seamless
              developer experience, you can focus on building features while
              keeping your code organized and efficient.
            </BlurFade>

            <div className="flex justify-center gap-4 pt-4">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <Link href="https://github.com/yaredow/nextjs-starter-template">
                  <Button
                    size="lg"
                    className="rounded-full transition-transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <Link href="https://github.com/yaredow/nextjs-starter-template">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full transition-transform hover:scale-105"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Github
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <section className="py-18 w-full px-4">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-12">
                <div className="space-y-4">
                  <div className="z-10 flex items-center justify-start">
                    <div
                      className={cn(
                        "group rounded-full text-base transition-all ease-in hover:cursor-pointer",
                      )}
                    >
                      <AnimatedShinyText className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 transition ease-out hover:text-blue-600 hover:duration-300 dark:border-blue-800/30 dark:bg-blue-900 hover:dark:text-blue-400">
                        <span>✨ Explore our adavantages</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </AnimatedShinyText>
                    </div>
                  </div>

                  <h1 className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-900 bg-clip-text font-montserrat text-4xl font-bold tracking-tight text-transparent dark:from-blue-50 dark:via-blue-400 dark:to-blue-200 sm:text-3xl md:text-4xl">
                    Make Development Easier
                  </h1>

                  <p className="text-lg text-muted-foreground">
                    Our Next.js template makes development faster and simpler.
                    You can focus on building great features, not on setting
                    things up.
                  </p>
                </div>

                <div className="space-y-8">
                  <Feature
                    icon={Icons.code2}
                    title="Quick Start"
                    description="Start coding quickly with our pre-set settings and best practices. No more time wasted on initial setup; just start building your app."
                  />

                  <Feature
                    icon={Icons.puzzle}
                    title="Focus on What Matters"
                    description="Spend your time solving real problems, not dealing with routine setup tasks."
                  />

                  <Feature
                    icon={Icons.network}
                    title="Built to Scale"
                    description="Our template is designed to handle growth, so your app can scale easily as it gets more users and features."
                  />
                </div>
              </div>

              {/* Right Column - Animation */}
              <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden">
                <OrbitingCircles iconSize={40}>
                  <Icons.nextjs />
                  <Icons.typescript />
                  <Icons.tailwind />
                  <Icons.shadcn />
                  <Icons.trpc />
                </OrbitingCircles>
                <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                  <Icons.drizzle />
                  <Icons.stripe />
                  <Icons.lock />
                  <Icons.jest />
                  <Icons.cypress />
                </OrbitingCircles>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <section className="py-18 w-full px-4">
          <div className="mx-auto max-w-6xl space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-900 bg-clip-text font-montserrat text-4xl font-bold tracking-tight text-transparent dark:from-blue-50 dark:via-blue-400 dark:to-blue-200 sm:text-3xl md:text-4xl">
                Built with Modern Tech Stack
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powered by the latest technologies to ensure scalability,
                security, and developer experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {technologies.map((tech) => (
                <Card
                  key={tech.name}
                  className="group relative overflow-hidden border border-blue-50 bg-gradient-to-b from-white to-blue-50/10 transition-shadow hover:shadow-md hover:shadow-blue-50 dark:border-blue-900/30 dark:from-background dark:to-blue-950/5 dark:hover:shadow-blue-900/10"
                >
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50/30 p-2 dark:bg-blue-900/10">
                        {tech.icon}
                      </div>
                      <Link href={tech.link}>
                        <div className="rounded-full p-2 transition-colors hover:bg-blue-50/70 dark:hover:bg-blue-900/20">
                          <Icons.arrowRight className="h-5 w-5 text-blue-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-blue-300" />
                        </div>
                      </Link>
                    </div>
                    <CardTitle className="text-xl">{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </BlurFade>

      <div
        className="fixed inset-0 -z-10 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--tw-gradient-stops))",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-background/0" />
      </div>
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100/80 text-blue-600 transition-colors hover:bg-blue-200/80 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-blue-950 dark:text-blue-100">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
