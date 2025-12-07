import { Facebook, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary-foreground flex items-center justify-center shadow-md">
                <span className="text-primary text-2xl font-bold">S</span>
              </div>
              <span className="text-2xl font-serif font-bold">Samhita</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Preserving and propagating the rich traditions of Hindustani classical music.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#home" className="hover:text-primary-foreground transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-primary-foreground transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#courses" className="hover:text-primary-foreground transition">
                  Tabla Classes
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-primary-foreground transition">
                  Vocal Training
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-primary-foreground transition">
                  Bhajan Classes
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-primary-foreground transition">
                  Music Therapy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/Samhita-Music-Forum-Sirsi-100063683925789/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@samhitamusicforumSirsi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="mailto:samhita75@gmail.com"
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 Samhita Music Forum. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-primary-foreground transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary-foreground transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
