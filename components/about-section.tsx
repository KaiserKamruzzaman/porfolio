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
                Hi, I'm Kaiser Kamruzzaman — a software engineer with experience
                building full-stack applications, scalable systems, and
                production-ready automation solutions.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl mx-auto text-justify">
                My work spans modern web technologies like Next.js, React,
                Node.js supported by strong database expertise in PostgreSQL,
                MySQL, and SQL Server. I also work extensively with cloud and
                DevOps tooling, including AWS, Docker, Terraform, CI/CD
                pipelines, Kubernetes, and Nginx, to design efficient and
                reliable infrastructure.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl mx-auto text-justify">
                I am currently expanding my expertise in cloud and DevOps
                engineering, focusing on automation, deployment workflows, and
                system scalability.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl mx-auto text-justify">
                Driven by clean architecture and continuous improvement, I aim
                to build technology that delivers measurable value and
                operational efficiency.
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
                    10+
                  </p>
                  <p className="text-sm text-foreground/60">Tech Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
