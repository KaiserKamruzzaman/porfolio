"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { useInView } from "@/hooks/use-in-view"
import { Code2, Cloud, Database, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "PHP", "Python", "C/C++", "SQL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Frameworks & Libraries",
    icon: Code2,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Laravel", "Django"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "SQL Server", "Oracle"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "GitHub Actions"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git", "VS Code", "Postman", "npm/Yarn", "Chrome DevTools", "Linux"],
    color: "from-indigo-500 to-blue-500",
  },
]

export function SkillsSection() {
  const [ref, isInView] = useInView()

  return (
    <ScrollReveal>
      <section id="skills" className="relative py-20 md:py-32 bg-muted/30 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ref}
            className={`space-y-2 text-center mb-16 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
              My Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Skills & Technologies</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto pt-4">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className={`group transition-all duration-1000 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10 dark:group-hover:shadow-primary/20 h-full">
                    {/* Gradient background on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${category.color}`}
                    />

                    <div className="relative z-10 space-y-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${category.color}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-xl font-display font-bold text-foreground">{category.title}</h3>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary text-sm font-medium border border-primary/20 dark:border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group-hover:bg-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
