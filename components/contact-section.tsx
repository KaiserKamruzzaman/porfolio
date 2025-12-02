"use client";

import type React from "react";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-muted/30 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`space-y-2 mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary dark:text-secondary text-sm font-semibold tracking-wider uppercase">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Contact Information */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Let's Connect
              </h3>
              <p className="text-lg text-foreground/60 max-w-lg">
                Have a project in mind? I'm always open to discussing new
                opportunities and exploring innovative solutions.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "kaiserkamruzzaman@gmail.com",
                  href: "mailto:kaiserkamruzzaman@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+49 155-60514989",
                  href: "tel:+49155-60514989",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Duisburg, Germany",
                  href: "#",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {contact.label}
                      </h4>
                      <p className="text-foreground/70 text-sm mt-1">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right side: Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-transparent border-t-white animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-400 text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 text-sm">
                    ✗ Failed to send message. Please try again or email me
                    directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
