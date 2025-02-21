import { BlurFade } from "@/components/magicui/blur-fade";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technologies } from "@/modules/home/constants";
import { Github } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl space-y-8 px-4 text-center">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h1 className="text-3xl font-extrabold md:text-5xl">
              Next Starter Template
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
