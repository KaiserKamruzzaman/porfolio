"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

const projects = [
  {
    title: "MES (Manufacturing Execution System)",
    description:
      "Collaboration platform for 10+ teams managing 20 production stages with real-time tracking from start to shipping.",
    highlights: [
      "Real-time analytics for performance",
      "Increased daily production by 7x",
      "Advanced order tracking system",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Chart.js"],
    link: "#",
  },
  {
    title: "OEM Portal for Doctors & Distributors",
    description:
      "Fully branded ordering and tracking portal with automated communication and production synchronization.",
    highlights: ["Integrated with MES", "Automated workflows", "Real-time order tracking"],
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    link: "#",
  },
  {
    title: "Complaint Management System",
    description:
      "PHP-based workflow automation system optimized for 30% performance improvement with comprehensive reporting.",
    highlights: ["30% performance optimization", "Advanced reporting features", "Automated tracking system"],
    tech: ["PHP", "MySQL", "Laravel", "JavaScript"],
    link: "#",
  },
]

export function ProjectsSection() {
  const [ref, isInView] = useInView()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const scrollLeft = scrollContainerRef.current.scrollLeft
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <ScrollReveal>
      <section id="projects" className="relative py-20 md:py-32 bg-muted/30 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ref}
            className={`space-y-2 text-center mb-16 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
              Highlighted Work
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto pt-4">
              Showcasing production-ready applications that drive real business value
            </p>
          </div>

          <div className="relative group">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 lg:gap-8 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start transition-all duration-1000 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 flex flex-col group-hover:-translate-y-2">
                    <div className="space-y-4 flex-1">
                      <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-foreground/70 leading-relaxed">{project.description}</p>

                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-sm text-foreground/60">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-1.5" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary border border-primary/20 dark:border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
