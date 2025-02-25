import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { technologies } from "@/modules/home/constants";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl space-y-8 px-4 text-center">
          <Button
            variant="outline"
            className="border-blue-900/30 bg-blue-900/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
          >
            <span className="mr-2">✨</span>
            Feature rich Next.js starter template
          </Button>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Next Starter
              <span className="ml-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Template
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            Kickstart your Next.js project with a clean and scalable foundation.
            This template follows a module-based file structure, ensuring
            maintainability and ease of expansion. With a seamless developer
            experience, you can focus on building features while keeping your
            code organized and efficient.
          </BlurFade>

          <div className="flex justify-center gap-4 pt-4">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <Button
                size="lg"
                className="transition-transform hover:scale-105"
              >
                Get Started
              </Button>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 transition-transform hover:scale-105"
              >
                <Github className="mr-2 h-5 w-5" />
                Github
              </Button>
            </BlurFade>
          </div>
        </div>
      </section>

      <section className="">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-12">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="border-blue-900/30 bg-blue-900/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
                >
                  <span className="mr-2">✨</span>
                  Why Choose Next Starter
                </Button>

                <h1 className="text-2xl font-bold tracking-tight sm:text-5xl md:text-4xl">
                  A Faster
                  <span className="ml-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    Path to Production
                  </span>
                </h1>

                <p className="text-lg text-gray-400">
                  Accelerate your development with our powerful Next.js starter
                  kit. Focus on building features, not infrastructure.
                </p>
              </div>

              <div className="space-y-8">
                <Feature
                  icon={Icons.code2}
                  title="Build faster"
                  description="Get up and running in no time with pre-configured settings and best practices. Say goodbye to setup and focus on what truly matters - building your application."
                />

                <Feature
                  icon={Icons.puzzle}
                  title="Focus on business logic"
                  description="Concentrate on solving business problems instead of dealing with the repetitive setup."
                />

                <Feature
                  icon={Icons.network}
                  title="Ready for scale"
                  description="Prepare for growth from day one. With built-in optimizations and scalable architecture, your application will be ready to handle increased traffic and complexity."
                />
              </div>
            </div>

            {/* Right Column - Animation */}
            <div className="flex items-center justify-center lg:h-full">
              <div className="relative flex h-[750px] w-full flex-col items-center justify-center overflow-hidden">
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
        </div>
      </section>

      <section className="w-full px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
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
                className="group relative overflow-hidden border bg-card"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center p-2">
                      {tech.icon}
                    </div>
                    <Icons.arrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
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

      <div
        className="fixed inset-0 -z-10 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
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
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/20">
          <Icon className="h-6 w-6 text-blue-300" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
