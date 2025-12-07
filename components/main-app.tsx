"use client"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FounderSection from "@/components/founder-section"
import AimsSection from "@/components/aims-section"
import FuturePlansSection from "@/components/future-plans-section"
import ObjectivesSection from "@/components/objectives-section"
import FacilitiesSection from "@/components/facilities-section"
import CoursesSection from "@/components/courses-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function MainApp() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* About & Founder - Light neutral background */}
      <div className="bg-gray-50/80 dark:bg-gray-900/50">
        <AboutSection />
        <FounderSection />
      </div>
      
      {/* Aims & Objectives - Slightly darker background */}
      <div className="bg-white dark:bg-gray-950/50">
        <AimsSection />
        <FuturePlansSection />
        <ObjectivesSection />
      </div>
      
      {/* Courses & Facilities - Light accent background */}
      <div className="bg-primary/5 dark:bg-primary/10">
        <FacilitiesSection />
        <CoursesSection />
      </div>
      
      {/* Gallery & Testimonials - Clean white background */}
      <div className="bg-white dark:bg-gray-950">
        <GallerySection />
        <TestimonialsSection />
      </div>
      
      {/* Contact - Slightly darker background */}
      <div className="bg-gray-50/80 dark:bg-gray-900/60">
        <ContactSection />
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
