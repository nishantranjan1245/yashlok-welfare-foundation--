import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Droplet, Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Add favicon
  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = '/image/favicon.png';
    document.head.appendChild(favicon);
  }, []);

  const navigationItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "About", path: createPageUrl("About") },
    { name: "Programs", path: createPageUrl("Programs") },
    { name: "Get Involved", path: createPageUrl("GetInvolved") },
    { name: "Updates", path: createPageUrl("Updates") },
    { name: "Contact", path: createPageUrl("Contact") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-blue-500/10" : "bg-white/90 backdrop-blur-sm shadow-md"
        }`}
      >
        {/* Animated gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] opacity-80">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
        </div>
        <style jsx>{`
          @keyframes shimmer {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group relative">
              <div className="relative w-14 h-14 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <img 
                  src="/image/header-logo.png" 
                  alt="Yashlok Welfare Foundation" 
                  className="w-25 h-25 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4481e0] via-[#248fa9] to-[#20939f] opacity-0 group-hover:opacity-20 rounded-full blur-lg transition-opacity duration-300" />
              </div>
              <div className="block relative z-10">
                <div className="font-bold text-xl bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] bg-clip-text text-transparent animate-gradient-text">
                  Yashlok Welfare
                </div>
                <style jsx>{`
                  @keyframes gradient-text {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                  }
                  .animate-gradient-text {
                    background-size: 200% auto;
                    animation: gradient-text 4s linear infinite;
                  }
                `}</style>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-5 py-2.5 text-base font-bold transition-all duration-300 rounded-lg group overflow-hidden ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-700 hover:text-white"
                  }`}
                >
                  {/* Background gradient on active/hover */}
                  <span className={`absolute inset-0 bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`} />

                  {/* Shine effect */}
                  <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${
                    location.pathname === item.path ? 'animate-shine' : ''
                  }`} />

                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </nav>
            <style jsx>{`
              @keyframes shine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
              .animate-shine {
                animation: shine 3s ease-in-out infinite;
              }
            `}</style>

            {/* Donate Button */}
            <div className="hidden lg:block">
              <Link to={createPageUrl("Donate")}>
                <Button className="bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] hover:from-[#3a6fc0] hover:via-[#1f7a8f] hover:to-[#1a7d8a] text-white px-8 py-2.5 font-semibold shadow-lg hover:shadow-2xl hover:shadow-[#4481e0]/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group animate-pulse-glow">
                  <span className="relative z-10 flex items-center gap-2">DONATE</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </Button>
              </Link>
            </div>
            <style jsx>{`
              @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 10px 15px -3px rgba(68, 129, 224, 0.3); }
                50% { box-shadow: 0 15px 25px -3px rgba(68, 129, 224, 0.5); }
              }
              .animate-pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to={createPageUrl("Donate")} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] hover:from-[#3a6fc0] hover:via-[#1f7a8f] hover:to-[#1a7d8a] text-white font-semibold">
                  DONATE
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
            {/* Logo & Description */}
            <div className="col-span-2 lg:col-span-1">
              <Link to={createPageUrl("Home")} className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12">
                  <img 
                    src="/image/footer-logo.png" 
                    alt="Yashlok Welfare Foundation" 
                    className="w-25 h-25 object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl bg-gradient-to-r from-[#4481e0] via-[#248fa9] to-[#20939f] bg-clip-text text-transparent animate-gradient-text">
                  Yashlok Welfare
                </div>
                </div>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Yashlok Welfare Foundation is a registered non-profit organization dedicated to river cleaning and road-safety awareness across India since 2017.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to={createPageUrl("Home")} className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to={createPageUrl("About")} className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to={createPageUrl("Programs")} className="hover:text-white transition-colors">Programs</Link></li>
                <li><Link to={createPageUrl("GetInvolved")} className="hover:text-white transition-colors">Get Involved</Link></li>
                <li><Link to={createPageUrl("Donate")} className="hover:text-white transition-colors">Donate</Link></li>
                <li><Link to={createPageUrl("Contact")} className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to={createPageUrl("RiverCleaningChecklist")} className="hover:text-white transition-colors">River Cleaning Checklist</Link></li>
                <li><Link to={createPageUrl("VolunteerToolkit")} className="hover:text-white transition-colors">Volunteer Toolkit</Link></li>
                <li><Link to={createPageUrl("RoadSafetyTips")} className="hover:text-white transition-colors">Road Safety Tips</Link></li>
                <li><Link to={createPageUrl("AnnualImpactReport")} className="hover:text-white transition-colors">Annual Impact Report</Link></li>
                <li><Link to={createPageUrl("MediaPressReleases")} className="hover:text-white transition-colors">Media & Press Releases</Link></li>
                <li><Link to={createPageUrl("EventHighlights")} className="hover:text-white transition-colors">Event Highlights</Link></li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="font-bold text-white mb-4">Contact & Legal</h3>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400"> B-405, Mohan Mansion, Gulmohar Road,
 Chunnabhati (E), Mumbai, Maharashtra, India – 400022</p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <a href="mailto:contact@yashlokwelfare.org" className="text-gray-400 hover:text-white transition-colors">contact@yashlokwelfare.org</a>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <a href="tel:+91-9876543210" className="text-gray-400 hover:text-white transition-colors">+91-9876543210</a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Legal Links */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© 2025 Yashlok Welfare Foundation. All Rights Reserved.</p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to={createPageUrl("TermsOfUse")} className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to={createPageUrl("RefundDonationPolicy")} className="hover:text-white transition-colors">Refund & Donation Policy</Link>
                <Link to={createPageUrl("Disclaimer")} className="hover:text-white transition-colors">Disclaimer</Link>
                <Link to={createPageUrl("Sitemap")} className="hover:text-white transition-colors">Sitemap</Link>
                <Link to={createPageUrl("TransparencyReport")} className="hover:text-white transition-colors">Transparency Report</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}