"use client"
import { Expand, BookOpen, GraduationCap } from "lucide-react"

export default function FuturePlansSection() {
  const plans = [
    {
      icon: Expand,
      title: "Extend Activities",
      description: "Extend activities to surrounding institutions and communities",
    },
    {
      icon: BookOpen,
      title: "Digital Music Library",
      description: "Provide comprehensive digital music library for learning and reference",
    },
    {
      icon: GraduationCap,
      title: "Learning Materials",
      description: "Provide music books and similar learning materials regularly to students",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-serif text-4xl md:text-5xl text-center text-secondary mb-4">Future Plans</h2>
        <div className="h-1 w-24 bg-gradient-maroon mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={index}
                className="hover-lift p-8 rounded-lg bg-card shadow-lg border border-border/20 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="heading-serif text-xl text-center text-secondary mb-3">{plan.title}</h3>
                <p className="text-center text-foreground/80 leading-relaxed">{plan.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
