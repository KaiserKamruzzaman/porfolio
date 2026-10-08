"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/KaiserKamruzzaman",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kaiserkamruzzaman",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:kaiserkamruzzaman@gmail.com", icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm font-medium text-foreground">
            Kaiser Kamruzzaman
          </p>
          <p className="text-sm text-foreground/60">
            © {currentYear}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-foreground/15 text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Icon size={18} />
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-foreground/15 text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
