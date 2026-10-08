"use client";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useInView } from "@/hooks/use-in-view";

export function AboutSection() {
  const [ref, isInView] = useInView();

  return (
    <ScrollReveal>
      <section id="about" className="relative py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-center">
            <div
              ref={ref}
              className={`space-y-6 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  About Me
                </h2>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-left">
                I'm a full-stack software engineer with 5+ years of experience
                building scalable web applications, enterprise systems, and
                workflow automation tools.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-left">
                Previously, at K Line Europe GmbH in Germany, I developed
                manufacturing management systems used daily by 10+ production
                teams, automated workflows that improved production efficiency
                by 30%, and built customer-facing portals for doctors and
                distributors.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-left">
                My core expertise includes{" "}
                <strong className="font-semibold text-foreground">
                  React, Next.js, TypeScript, Node.js, and PostgreSQL
                </strong>
                , complemented by hands-on experience with{" "}
                <strong className="font-semibold text-foreground">
                  AWS, Docker, and CI/CD pipelines
                </strong>
                .
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-left">
                I enjoy solving complex business problems, designing
                maintainable software architectures, and building applications
                that make a measurable difference in how businesses operate.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    5+
                  </p>
                  <p className="text-sm text-foreground/60">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    10+
                  </p>
                  <p className="text-sm text-foreground/60">
                    Production Teams Supported
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">
                    ~7×
                  </p>
                  <p className="text-sm text-foreground/60">
                    Growth in Daily Production
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
