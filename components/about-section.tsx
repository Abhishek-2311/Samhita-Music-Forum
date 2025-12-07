"use client"

import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

export default function AboutSection() {
  return (
    <AnimatedSection
      as="section"
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main About Section */}
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <AnimatedItem as="h2" className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
              About Us
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex items-center justify-center gap-2 mx-auto w-32">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="flex-1 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              </div>
            </AnimatedItem>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <AnimatedItem as="div" className="text-lg leading-relaxed">
              "Samhita Music Forum" is the Brainchild of Vid. Shri Anant Hegde, renowned Tabla artist from a remote village
              Vajgar Siddapur near Sirsi of Uttara Kannada district. He conceptualized the forum from scratch with the
              assistance of some of the equal minded friends and students in 2009. Forum has got registered in 2010.
              There were 9 directors on the board & Annual processes as per the law is followed.
            </AnimatedItem>

            <AnimatedItem as="div" className="text-lg leading-relaxed" delay={0.1}>
              Initial activities of the forum were focused only on the Imparting knowledge in the sphere of Tabla –
              Hindustani Instrumental Music & Hindustani Classical Music. Later, the wings are stretched to the areas of
              recognition of senior musicians, awareness programs, Baithaks, Annual state level music programs by
              renowned artists, music competitions, etc. Samhitha has imparted artistic knowledge to more than 500
              students till date in classical Tabla & Vocal streams.
            </AnimatedItem>

            <AnimatedItem as="div" className="text-lg leading-relaxed" delay={0.2}>
              Samhita carries a lot of aspirations towards safeguarding, enriching the cultural aspects of the soil and
              planning more creative activities towards achieving the same. Organization was inaugurated on 19 September
              2009 and registered on 16 April 2010 under the co-operative societies act and also under K.S.E.E. Board as
              an institution for teaching music with the premier motto of promoting the cultural environment.
            </AnimatedItem>

            <AnimatedItem as="div" className="text-lg leading-relaxed font-serif italic text-amber-700 dark:text-amber-400 border-l-4 border-amber-500/50 pl-6 py-2 bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-r-lg" delay={0.3}>
              "Music is not just about entertainment. It's about touching the soul and connecting with something greater than ourselves."
              <span className="block text-right text-sm mt-2 text-amber-600 dark:text-amber-300">- Ustad Zakir Hussain</span>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
