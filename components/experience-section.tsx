"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { useInView } from "@/hooks/use-in-view";
import { MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Software Engineer",
    company: "K Line Europe GmbH",
    location: "Düsseldorf, Germany",
    period: "February 2022 – September 2026",
    stack: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "AWS",
      "Prisma",
    ],
    highlights: [
      "Developed and maintained a Manufacturing Execution System (MES) used by 10+ production teams to track products across 20 production stages, supporting a nearly 7× increase in daily production.",
      "Automated pouch printing workflows, improving production efficiency by 30% and reducing manual errors.",
      "Implemented an SLA workflow that improved production throughput by 20% and streamlined revenue calculations.",
      "Built a white-label OEM portal for doctors and distributors, supporting order management, communication, and production tracking.",
      "Developed a QR-code-based dynamic case card system, centralizing product information from 3D printing through shipment.",
    ],
  },
  {
    role: "Programmer",
    company: "Digicon Technologies Ltd",
    location: "Dhaka, Bangladesh",
    period: "July 2019 – December 2020",
    stack: ["PHP (OOP)", "MySQL", "JavaScript", "Laravel", "jQuery"],
    highlights: [
      "Developed complaint management systems using PHP and MySQL, improving call-center efficiency and reducing information errors by 25%.",
      "Built a complaint management portal for malaria control, adopted by Dhaka City Corporation.",
      "Created an internal task management system for assigning, tracking, and monitoring employee tasks across departments.",
    ],
  },
];

export function ExperienceSection() {
  const [ref, isInView] = useInView();

  return (
    <ScrollReveal>
      <section id="experience" className="relative py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ref}
            className={`space-y-2 text-center mb-16 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative pl-8 pb-8 border-l-2 border-primary/30 hover:border-primary/60 transition-colors group">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary border-4 border-background dark:border-slate-950 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all" />

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-lg text-primary dark:text-secondary font-semibold">
                      {exp.company}
                      <span className="flex items-center gap-1 text-sm text-foreground/60 font-normal">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-4">
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-foreground/70"
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-full border border-primary/20 bg-primary/5 text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
