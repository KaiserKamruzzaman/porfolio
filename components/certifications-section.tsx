"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { useInView } from "@/hooks/use-in-view"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Foundational knowledge of AWS cloud services, architecture, and security.",
    skills: ["AWS", "Cloud Architecture", "Security", "Best Practices"],
    link: "#",
  },
  {
    title: "Docker & Kubernetes Specialist",
    issuer: "Linux Academy",
    date: "2023",
    description: "Container orchestration, deployment automation, and microservices architecture.",
    skills: ["Docker", "Kubernetes", "Containers", "DevOps"],
    link: "#",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Udemy Professional",
    date: "2022",
    description: "Advanced techniques in React, Node.js, and database design for production applications.",
    skills: ["React", "Node.js", "Databases", "Full-Stack"],
    link: "#",
  },
]

export function CertificationsSection() {
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
      <section id="certifications" className="relative py-20 md:py-32 bg-background dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ref}
            className={`space-y-2 text-center mb-16 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
              Professional Development
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Certifications & Training</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto pt-4">
              Industry-recognized certifications and specialized training programs
            </p>
          </div>

          <div className="relative group">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 lg:gap-8 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start transition-all duration-1000 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 dark:hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 dark:hover:shadow-secondary/20 flex flex-col group-hover:-translate-y-2">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <Award className="w-8 h-8 text-secondary flex-shrink-0" />
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                        {cert.date}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-secondary transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-1">{cert.issuer}</p>
                      </div>

                      <p className="text-foreground/70 leading-relaxed">{cert.description}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded text-xs font-medium bg-secondary/10 dark:bg-secondary/20 text-secondary border border-secondary/20 dark:border-secondary/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="w-full mt-6 justify-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 items-center justify-center w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/40 text-secondary transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 items-center justify-center w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/40 text-secondary transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
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
