"use client";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useInView } from "@/hooks/use-in-view";

export function AboutSection() {
  const [ref, isInView] = useInView();

  return (
    <ScrollReveal>
      <section id="about" className="relative py-20 md:py-32">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-8xl mx-auto text-center">
            <div
              ref={ref}
              className={`space-y-6 transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  About Me
                </h2>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl mx-auto text-justify">
                I'm a software engineer with 4+ years of experience building
                full-stack applications and enterprise-grade systems. Currently
                based in Germany, I work at K Line Europe GmbH where I design
                and ship production management tools used daily across 10+ teams
                on the factory floor.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl mx-auto text-justify">
                My stack spans Next.js, React, Node.js, and PostgreSQL on the
                application side, backed by hands-on experience with AWS,
                Docker, Kubernetes, Terraform, and CI/CD pipelines on the
                infrastructure side. I care about writing clean, maintainable
                code that solves real problems at scale.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    4+
                  </p>
                  <p className="text-sm text-foreground/60">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    20+
                  </p>
                  <p className="text-sm text-foreground/60">
                    Projects Delivered
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    15+
                  </p>
                  <p className="text-sm text-foreground/60">Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
