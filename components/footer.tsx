"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="#"
              className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Kaiser.Dev
            </Link>
            <p className="text-sm text-foreground/60">
              Software Engineer & DevOps Specialist crafting scalable solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/KaiserKamruzzaman"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
              >
                <Github size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/kaiserkamruzzaman"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
              >
                <Linkedin size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:kaiserkamruzzaman@gmail.com"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
              >
                <Mail size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>
            Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> by Kaiser Kamruzzaman. {currentYear}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
