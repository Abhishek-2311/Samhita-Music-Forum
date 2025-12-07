import { AnimatedItem, AnimatedSection } from '@/components/ui/animated-section'

export default function CoursesSection() {
  const courses = [
    {
      id: 1,
      name: 'Hindustani Taalavadya (Tabla)',
      description: 'Learn the art of tabla, mastering rhythmic patterns, compositions, and traditional techniques of Hindustani classical percussion.',
    },
    {
      id: 2,
      name: 'Hindustani Vocal',
      description: 'Explore the rich tradition of Hindustani classical vocal music, including raag, taan, and expressive singing techniques.',
    },
    {
      id: 3,
      name: 'Bhajan Classes',
      description: 'Immerse yourself in devotional music through bhajan classes, learning traditional compositions and spiritual melodies.',
    },
    {
      id: 4,
      name: 'Music Therapy',
      description: 'Experience the healing power of music through therapeutic sessions designed to promote wellness and emotional well-being.',
    },
  ]

  return (
    <AnimatedSection id="courses" as="section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <AnimatedItem className="inline-flex items-center justify-center space-x-2 text-sm uppercase tracking-wider text-amber-700 dark:text-amber-300 font-medium">
              <span>Learn & Excel</span>
              <span className="w-8 h-px bg-amber-400/50"></span>
            </AnimatedItem>
            <AnimatedItem as="h2" className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
              Our Courses
            </AnimatedItem>
            <AnimatedItem delay={0.05}>
              <div className="flex items-center justify-center gap-2 mx-auto w-32">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="flex-1 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              </div>
            </AnimatedItem>
            <AnimatedItem as="p" className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto" delay={0.1}>
              From beginners to advanced practitioners, we offer comprehensive courses tailored to your musical journey.
            </AnimatedItem>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <AnimatedItem
                key={course.id}
                className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-8 hover:shadow-md transition-all duration-300"
                delay={0.2 + index * 0.1}
              >
                <div className="space-y-4">
                  <div className="w-12 h-1 bg-amber-500 mb-4"></div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>

          <div className="text-center pt-8">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              Enroll Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
