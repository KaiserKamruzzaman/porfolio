"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { useInView } from "@/hooks/use-in-view";
import { MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "K Line Europe GmbH",
    location: "Düsseldorf, Germany",
    period: "2022 – Present",
    highlights: [
      "Built an automated pouch printing system that increased team productivity by 30%",
      "Designed a QR-code-based dynamic case card system for real-time production tracking",
      "Developed an SLA workflow engine that improved overall production throughput by 20%",
      "Built a white-label OEM portal for doctors and distributors, integrated with the MES",
      "Led full-stack development of production management modules used daily by 10+ teams",
    ],
  },
  {
    role: "Programmer",
    company: "Digicon Technologies Ltd",
    location: "Dhaka, Bangladesh",
    period: "2019 – 2020",
    highlights: [
      "Built a BPO complaint management system that reduced issue resolution time by 25%",
      "Developed a pandemic tracking portal for Dhaka City Corporation during the COVID-19 crisis",
      "Created an internal task management system adopted across all company departments",
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
            className={`space-y-2 text-center mb-16 transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
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
                className={`transition-all duration-1000 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
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
