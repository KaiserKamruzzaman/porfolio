"use client"

import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const education = [
  {
    degree: "MSc in High Integrity Systems",
    university: "Frankfurt University of Applied Sciences",
    location: "Frankfurt, Germany",
    period: "2022 – 2026",
  },
  {
    degree: "BSc in Computer Science & Engineering",
    university: "American International University-Bangladesh",
    location: "Dhaka, Bangladesh",
    period: "2015 – 2018",
  },
]

export function EducationSection() {
  const [ref, isInView] = useInView()

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`space-y-2 mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
            Educational Background
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Education</h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              className={`transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary dark:text-secondary font-semibold">{edu.university}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 pt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
