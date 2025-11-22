"use client"
import { Music, Trophy, DollarSign, Radio, BookOpen, Users, Heart } from "lucide-react"

export default function FacilitiesSection() {
  const facilities = [
    {
      icon: Music,
      title: "Classical Music Training",
      description: "Training in Hindustani classical & light vocal, tabla, Sanskrit shloka, Bhagavadgeeta",
    },
    {
      icon: Trophy,
      title: "Exam Preparation",
      description: "Students can appear for KSEE Board Bangalore and ABGM music examinations",
    },
    {
      icon: DollarSign,
      title: "Scholarship Support",
      description: "Eligible students can apply for scholarships from state, central and NGOs",
    },
    {
      icon: Radio,
      title: "Broadcast Auditions",
      description: "Eligible students can apply for AIR & Doordarshan auditions",
    },
    {
      icon: BookOpen,
      title: "Academic Guidance",
      description: "Theory & practical guidance for UG, PG, NET/SLET courses",
    },
    {
      icon: Users,
      title: "National Affiliation",
      description:
        "Affiliated to Gandharva Mahavidyalay Mandal Mumbai (exam center for vocal, instrumental & Bharatanatyam)",
    },
    {
      icon: Heart,
      title: "Music Therapy",
      description: "Music therapy coaching by certified instructors",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-serif text-4xl md:text-5xl text-center text-secondary mb-4">Facilities for Students</h2>
        <div className="h-1 w-24 bg-gradient-saffron mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon
            return (
              <div
                key={index}
                className="hover-lift p-6 rounded-lg bg-card shadow-md border border-border/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-serif text-lg text-secondary mb-2">{facility.title}</h3>
                    <p className="text-sm text-foreground/80">{facility.description}</p>
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
