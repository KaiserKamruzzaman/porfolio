"use client"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useInView } from "@/hooks/use-in-view"

export function AboutSection() {
  const [ref, isInView] = useInView()

  return (
    <ScrollReveal>
      <section id="about" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div
              ref={ref}
              className={`space-y-6 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
                  About Me
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold">Crafting Solutions That Scale</h2>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Experienced Software Engineer with a strong background in building scalable websites and enterprise
                applications. Skilled in full-stack development, DevOps, cloud automation, and delivering solutions that
                improve efficiency, performance, and workflows.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Passionate about learning, collaboration, and building systems that simplify complex processes. I bridge
                the gap between development and operations, ensuring applications not only perform well but scale
                seamlessly in production environments.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">5+</p>
                  <p className="text-sm text-foreground/60">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">20+</p>
                  <p className="text-sm text-foreground/60">Projects Delivered</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-display font-bold text-primary dark:text-secondary">10+</p>
                  <p className="text-sm text-foreground/60">Tech Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
