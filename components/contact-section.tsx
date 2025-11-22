'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider">Join Our Community</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance">
              Start Your Musical Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Register now to begin your Hindustani classical music training with our master musicians
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Get in Touch</h3>
                <p className="text-muted-foreground mb-8">
                  Have questions? Reach out to us anytime. Our team is ready to help you begin your musical journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">Phone</p>
                    <p className="text-muted-foreground">9731095085 / 9480461954</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">Email</p>
                    <p className="text-muted-foreground">samhita75@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">Address</p>
                    <p className="text-muted-foreground">Samhita Music Forum, Sirsi, Karnataka 581401</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Samhita+Music+Forum,+Sirsi,+Karnataka+581401&output=embed"
                  width="100%"
                  height="288"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Samhita Music Forum Location"
                  className="w-full"
                />
                <div className="p-3 text-center bg-card/50 border-t border-primary/10">
                  <a
                    href="https://maps.app.goo.gl/5xKF6GXS2t8RWs5t6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 rounded-2xl p-8 space-y-6 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-bold text-foreground">Register Now</h3>
                  <p className="text-muted-foreground text-sm mt-2">Fill in your details to get started</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="abc@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Course Interest / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Which course interests you? (Tabla, Vocal, etc.)"
                    rows={4}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg"
                >
                  Register Now
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll contact you within 24 hours to confirm your registration and discuss your musical goals.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
