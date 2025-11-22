"use client"
import { Target, BookOpen, Award, Megaphone, Users, Heart, Star, Mic, Library } from "lucide-react"

export default function ObjectivesSection() {
  const objectives = [
    {
      icon: Target,
      title: "Strengthen the Forum",
      description: "Motivate cultural enthusiasts to join and participate",
    },
    {
      icon: Megaphone,
      title: "Promote Culture & Music",
      description: "Conduct programmes to promote music and traditional arts",
    },
    {
      icon: BookOpen,
      title: "Training & Awareness",
      description: "Arrange training & information programmes for publicity and knowledge",
    },
    {
      icon: Users,
      title: "Establish Teaching Institute",
      description: "Create a teaching institute for quality music & traditional art training",
    },
    {
      icon: Mic,
      title: "Conduct Programs",
      description: "Organize demonstrations, workshops, seminars and conferences of music and traditional arts",
    },
    {
      icon: Award,
      title: "Honor Achievers",
      description: "Felicitate and honor senior artists and achievers",
    },
    {
      icon: Heart,
      title: "Support Artists",
      description: "Provide help for poor, frustrated or challenged artists",
    },
    {
      icon: Star,
      title: "Develop Talents",
      description: "Promote upcoming talents from local, national and international levels",
    },
    {
      icon: Mic,
      title: "Performance Coaching",
      description: "Provide coaching for performance and examination orientation",
    },
    {
      icon: Library,
      title: "Library & Resources",
      description: "Provide library and audio-visual facilities",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-serif text-4xl md:text-5xl text-center text-secondary mb-4">Objectives of the Forum</h2>
        <div className="h-1 w-24 bg-gradient-saffron mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, index) => {
            const Icon = obj.icon
            return (
              <div
                key={index}
                className="hover-lift p-6 rounded-lg bg-card shadow-md border border-border/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-serif text-lg text-secondary mb-2">{obj.title}</h3>
                    <p className="text-sm text-foreground/80">{obj.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
