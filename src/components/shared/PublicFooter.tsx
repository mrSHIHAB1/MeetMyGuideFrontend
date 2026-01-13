import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Compass } from 'lucide-react';

function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content pt-16 pb-8 border-t border-base-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                <Compass className="text-primary-content w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text ">
                MyGuide
              </span>
            </Link>
            <p className="text-base-content/70 leading-relaxed max-w-sm">
              Discover unique experiences and hidden gems with our expert local guides. We connect you with the soul of every destination.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'Youtube' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-base-300 p-2.5 rounded-full hover:bg-blue-500 hover:text-primary-content transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
            </h6>
            <ul className="space-y-3">
              {['Home', 'Destinations', 'Top Guides', 'Tour Packages', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="link link-hover text-base-content/80 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
            </h6>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-base-content/80">
                <div className="bg-base-300 p-2 rounded-lg">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span>123 Global Street, Tour City, World</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/80">
                <div className="bg-base-300 p-2 rounded-lg">
                  <Phone size={18} className="text-primary" />
                </div>
                <span>+1 (555) 000-1111</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/80">
                <div className="bg-base-300 p-2 rounded-lg">
                  <Mail size={18} className="text-primary" />
                </div>
                <span>hello@meetmyguide.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h6 className="text-lg font-bold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
            </h6>
            <p className="text-base-content/70 mb-4">Subscribe to get the latest travel tips and offers.</p>
            <div className="join w-full shadow-lg">
              <input
                type="text"
                placeholder="Email address"
                className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
              />
              <button className="btn bg-blue-500 hover:bg-blue-600 join-item px-6 hover:scale-105 transition-transform">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-300 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base-content/60 text-sm">
            © {currentYear} <span className="font-semibold text-primary">MyGuide</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-base-content/60">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;