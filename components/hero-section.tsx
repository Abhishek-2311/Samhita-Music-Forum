'use client'

import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

const stats = [
  { label: 'Years of Experience', value: '20+' },
  { label: 'Happy Students', value: '500+' },
]

export default function HeroSection() {
  return (
    <AnimatedSection
      as="section"
      id="home"
      className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/tabla-tanpura-sitar-instruments-background.jpg"
          alt="Classical instruments background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-amber-50/70 dark:from-gray-900/85 dark:via-gray-900/80 dark:to-gray-900/70"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-amber-100/10 to-amber-50/20 dark:from-amber-300/5 dark:to-amber-200/5 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-5 w-56 h-56 rounded-full bg-gradient-to-tr from-amber-200/10 to-amber-100/15 dark:from-amber-400/5 dark:to-amber-300/5 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center items-center">
          <div className="space-y-8 text-center max-w-3xl">
            <div className="space-y-4 sm:space-y-6">
              <AnimatedItem as="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-balance leading-tight text-gray-900 dark:text-white">
                Samhita Music Forum, Sirsi
              </AnimatedItem>
              <AnimatedItem as="p" className="text-lg sm:text-xl text-amber-700 dark:text-amber-400 font-semibold leading-relaxed">
                Affiliated with Gandharva Mahavidyalaya, Maharashtra
              </AnimatedItem>
            </div>

            <AnimatedItem as="p" className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto" delay={0.1}>
              Providing authentic Hindustani classical music education through experienced teachers.
              Classes include tabla and vocal training, systematic syllabus-based learning, and guidance for formal music examinations.
            </AnimatedItem>

            <AnimatedItem as="div" className="flex flex-wrap gap-4 pt-4 justify-center" delay={0.2}>
              <a
                href="#contact"
                className="px-8 sm:px-12 py-3 sm:py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-amber-700/20"
              >
                Enroll Now
              </a>
            </AnimatedItem>

            {/* Stats Section with enhanced styling */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-10 max-w-md mx-auto">
              {stats.map((stat, index) => (
                <AnimatedItem
                  key={stat.label}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-amber-100 dark:border-amber-900/30 shadow-md"
                  delay={0.3 + index * 0.1}
                >
                  <div className="text-4xl font-serif font-bold text-amber-700 dark:text-amber-400">{stat.value}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </AnimatedSection>
  )
}
