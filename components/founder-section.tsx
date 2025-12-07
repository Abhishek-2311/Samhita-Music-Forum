"use client"

import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

export default function FounderSection() {
  return (
    <AnimatedSection as="section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/30 to-white dark:from-gray-900 dark:to-gray-900/95">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <AnimatedItem as="h2" className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            OUR FOUNDER
          </AnimatedItem>
          <AnimatedItem as="h3" className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400" delay={0.1}>
            Vid. Shri. ANANT HEGDE VAJGAR
          </AnimatedItem>
          <AnimatedItem delay={0.2}>
            <div className="flex items-center justify-center gap-2 mx-auto w-32 mt-4">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            </div>
          </AnimatedItem>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <AnimatedItem className="relative" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100 dark:border-amber-900/50">
              <img
                src="/guruji-anant-hegde.jpg"
                alt="Vid. Shri. Anant Hegde Vajgar - Founder of Samhita Music Forum"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400/20 dark:bg-amber-600/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-300/20 dark:bg-amber-500/20 rounded-full blur-2xl -z-10"></div>
          </AnimatedItem>

          {/* Text Column */}
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <AnimatedItem as="p" className="text-lg leading-relaxed text-gray-700 dark:text-gray-300" delay={0.3}>
              Hindustani Tabla artist, Sanskrit and Kannada writer, Composer, Certified Music therapy guider. Started
              music career at tender age. Learned basic techniques of Tabla under Vid. Shri. Mohan Hegde. Further Studies
              have been taken with Pt. Raghunath Nakod the stalwart of Delhi, Poorab, Ajarada and Punjab Gharanas of
              Tabla. Gained essential knowledge in the concept of Ragadhara and Vocal late. Pt. Shripathi Padigar.
            </AnimatedItem>

            <AnimatedItem as="p" className="text-lg leading-relaxed text-gray-700 dark:text-gray-300" delay={0.4}>
              A Grade Tabla artist of All India Radio and Door darshan. Vidwath in music from K.S.E.E. Board, Bangalore
              with rank for Karnataka State. Bachelor of music degree from Karnataka University, Dharwad with 1st rank and
              Ambabai Hangal memorial gold medal. Master of music from Indira Kala Sangit Vishwa Vidyalay, Khairagarh
              (C.G.) with rank. Passed NET with top marking. Music Therapy certification by DDF Spain.
            </AnimatedItem>

            <AnimatedItem as="p" className="text-lg leading-relaxed text-gray-700 dark:text-gray-300" delay={0.5}>
              Sur Singar Samsad, Mumbai was awarded with the "TALAMANI" title in 2007. And providing guidance for music
              students for all types of examinations and stage performance. Founder director and principal of Samhita
              Music Forum® Sirsi
            </AnimatedItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
