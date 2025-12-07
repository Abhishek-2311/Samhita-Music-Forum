"use client"

import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

export default function FounderSection() {
  return (
    <AnimatedSection as="section" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <AnimatedItem as="h2" className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            OUR FOUNDER
          </AnimatedItem>
          <AnimatedItem as="h3" className="text-2xl font-serif font-bold text-accent" delay={0.1}>
            Vid. Shri. ANANT HEGDE VAJGAR
          </AnimatedItem>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <AnimatedItem as="p" className="text-lg leading-relaxed">
            Hindustani Tabla artist, Sanskrit and Kannada writer, Composer, Certified Music therapy guider. Started
            music career at tender age. Learned basic techniques of Tabla under Vid. Shri. Mohan Hegde. Further Studies
            have been taken with Pt. Raghunath Nakod the stalwart of Delhi, Poorab, Ajarada and Punjab Gharanas of
            Tabla. Gained essential knowledge in the concept of Ragadhara and Vocal late. Pt. Shripathi Padigar.
          </AnimatedItem>

          <AnimatedItem as="p" className="text-lg leading-relaxed" delay={0.1}>
            High Grade Tabla artist of All India Radio and Door darshan. Vidwath in music from K.S.E.E. Board, Bangalore
            with rank for Karnataka State. Bachelor of music degree from Karnataka University, Dharwad with 1st rank and
            Ambabai Hangal memorial gold medal. Master of music from Indira Kala Sangit Vishwa Vidyalay, Khairagarh
            (C.G.) with rank. Passed NET with top marking. Music Therapy certification by DDF Spain.
          </AnimatedItem>

          <AnimatedItem as="p" className="text-lg leading-relaxed" delay={0.2}>
            Sur Singar Samsad, Mumbai was awarded with the "TALAMANI" title in 2007. And providing guidance for music
            students for all types of examinations and stage performance. Founder director and principal of Samhita
            Music Forum® Sirsi
          </AnimatedItem>
        </div>
      </div>
    </AnimatedSection>
  )
}
