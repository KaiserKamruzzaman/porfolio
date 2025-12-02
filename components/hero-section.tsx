"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolygonMeshBackground } from "./polygon-mesh-background";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "./Kaiser_kamruzzaman_resume.pdf";
    link.download = "Kaiser_Kamruzzaman_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Polygon Mesh Background */}
      <div className="absolute inset-0">
        <PolygonMeshBackground />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40 dark:from-transparent dark:via-slate-950/20 dark:to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent dark:from-slate-950 dark:via-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 ${isLoaded ? "animate-slide-in-left" : ""}`}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-display font-bold text-balance leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Kaiser Kamruzzaman
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                Software Engineer & Cloud Practitioner
              </p>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-md">
                Building robust, scalable systems through clean code.
                Specializing in cloud platforms and automation.Delivering
                enterprise-grade solutions that optimize workflows and drive
                operational efficiency.Based in Germany.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="#projects">
                <Button className="group h-12 px-8 text-base font-semibold">
                  View My Work
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* <Link href="#contact">
                <Button
                  variant="outline"
                  className="h-12 px-8 text-base font-semibold bg-transparent "
                >
                  Get in Touch
                </Button>
              </Link> */}
              <button
                onClick={handleDownloadResume}
                className="h-12 px-8 text-base font-semibold bg-transparent border border-primary/30 hover:border-primary/60 
                text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 transition-all rounded-lg flex items-center gap-2"
              >
                <span className="text-lg">⬇</span>
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-foreground/50">Connect:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/KaiserKamruzzaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
                >
                  <Github
                    size={20}
                    className="text-foreground/60 group-hover:text-primary transition-colors"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/kaiserkamruzzaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
                >
                  <Linkedin
                    size={20}
                    className="text-foreground/60 group-hover:text-primary transition-colors"
                  />
                </a>
                <a
                  href="mailto:kaiserkamruzzaman@gmail.com"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 dark:hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
                >
                  <Mail
                    size={20}
                    className="text-foreground/60 group-hover:text-primary transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Profile Image */}
          <div
            className={`flex justify-center ${
              isLoaded ? "animate-slide-in-right" : ""
            }`}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Animated border circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-75 animate-pulse" />
              <div className="absolute inset-4 rounded-full border-2 border-primary/30 dark:border-primary/50 animate-shimmer" />

              {/* Profile Image Container */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/50 dark:border-primary/40 shadow-2xl bg-gradient-to-br from-card to-muted">
                <img
                  src="./kaiser.png"
                  alt="Kaiser Kamruzzaman"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating animation */}
              <style>{`
                @keyframes floatProfile {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-30px); }
                }
                .animate-float-profile {
                  animation: floatProfile 8s ease-in-out infinite;
                }
              `}</style>
              <div className="absolute inset-0 animate-float-profile" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-foreground/50">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-primary/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
