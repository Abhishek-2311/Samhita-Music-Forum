'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { convertGoogleDriveLink } from '@/lib/gallery-utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-amber-100 dark:border-amber-900/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="#home" className="flex items-center gap-2 sm:gap-3">
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full p-1 sm:p-1.5 border-2 sm:border-4 border-amber-200 dark:border-amber-700 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img
                src="/samhita-logo.png"
                alt="Samhita Music Forum Logo"
                className="h-22 w-22 sm:h-26 sm:w-26 md:h-30 md:w-30 lg:h-36 lg:w-36 object-contain mt-2 sm:mt-3"
                loading="eager"
              />
            </div>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-base font-serif font-medium text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 relative group"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-600 dark:bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-2 items-center">
            <a
              href="#contact"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-serif font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 border-t border-border/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-serif text-foreground hover:bg-accent/10 rounded-lg transition-colors active:bg-accent/20"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="block w-full mt-4 px-6 py-3.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-semibold text-center active:scale-95 transform"
                onClick={() => setIsOpen(false)}
              >
                Register Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
