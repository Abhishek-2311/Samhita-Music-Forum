"use client"

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Shridhar Gaonkar',
      role: 'Student / Emerging Tabla Artist',
      text: 'Being part of this academy has shaped me into the artist I am today. With over 15 years of learning, I can confidently say that our class is truly the hub of music learning in Sirsi. Guruji\'s immense knowledge of Hindustani music and his deeply traditional teaching style have helped me refine my skills and understand the true depth of tabla. The guru-shishya atmosphere, devotion to music, and constant encouragement have played a huge role in my growth as a young emerging tabla artist.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Pannaga Hegde',
      role: 'Student / Professional Tabla Artist',
      text: 'Even though tabla is my second profession and a passionate hobby I have followed for over 15 years, the learning I receive here feels first-class. Guruji\'s traditional approach, discipline, and vast knowledge always inspire me to keep improving. The homely environment, encouragement to participate in programs, and opportunities to prepare for Gandharva Mahavidyalaya exams make the academy very special.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Avyay Hegde',
      role: 'Tabla Student',
      text: 'As a school-going student, learning tabla here has been an amazing journey. Guruji teaches with so much patience and ensures our basics are very strong. The class feels like a family, and I love the traditional way of learning. The academy encourages students like me to take part in competitions and exams, which builds confidence.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Tejaswini Bhat',
      role: 'Vocal Student',
      text: 'I have been learning vocal music for more than 10 years, and this academy has been a blessing in my musical journey. Our Vocal Ma\'am is extremely talented and teaches with so much clarity, devotion, and traditional depth. The belief that music is a form of worship is truly felt in every class.',
      rating: 5,
    },
  ]

  return (
    <section 
      id="testimonials" 
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <p className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance">
              What Our Students Say
            </h2>
            <div className="w-24 h-1 bg-primary/50 mx-auto rounded-full"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="h-full">
                <div 
                  className="h-full bg-card/80 backdrop-blur-sm border border-accent-light/30 rounded-xl p-8 hover:shadow-lg transition-all 
                  hover:border-primary/30 hover:bg-card/90 hover:-translate-y-1"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-lg text-foreground leading-relaxed mb-6 relative">
                    <span className="absolute -left-2 -top-2 text-5xl text-primary/20 font-serif">"</span>
                    {testimonial.text}
                  </p>

                  <div className="border-t border-accent-light/30 pt-4 mt-6">
                    <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-primary/80">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="text-center pt-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <span className="w-8 h-px bg-primary/30"></span>
              <span>More than 100+ students trust our academy</span>
              <span className="w-8 h-px bg-primary/30"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
