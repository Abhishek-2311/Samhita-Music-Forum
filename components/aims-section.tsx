"use client"
import { Music, Users, Lightbulb } from "lucide-react"
import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

export default function AimsSection() {
  const aims = [
    {
      icon: Music,
      title: "Music Programs & Events",
      description: "Arrange music baithaks, workshops, seminars and conferences",
    },
    {
      icon: Users,
      title: "Student Training & Excellence",
      description:
        "Train students for music exams, competitions and stage performances with traditional & quality guidance",
    },
    {
      icon: Lightbulb,
      title: "Support for Artists",
      description:
        "Felicitate senior artists and provide financial help for poor or challenged artists and music learners",
    },
  ]

  return (
    <AnimatedSection as="section" className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto">
        <AnimatedItem as="h2" className="heading-serif text-4xl md:text-5xl text-center text-secondary mb-4">
          Organization Aims
        </AnimatedItem>
        <AnimatedItem>
          <div className="h-1 w-24 bg-gradient-saffron mx-auto mb-12"></div>
        </AnimatedItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aims.map((aim, index) => {
            const Icon = aim.icon
            return (
              <AnimatedItem
                key={index}
                className="hover-lift p-8 rounded-lg bg-card shadow-lg border border-border/20 transition-all duration-300"
                delay={0.1 * index}
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="heading-serif text-xl text-center text-secondary mb-3">{aim.title}</h3>
                <p className="text-center text-foreground/80 leading-relaxed">{aim.description}</p>
              </AnimatedItem>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
