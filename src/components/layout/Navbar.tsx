"use client";

/**
 * ============================================================================
 * NAVIGATION BAR COMPONENT
 * 
 * PURPOSE:
 * Provides sticky navigation with responsive mobile menu overlay.
 * Fades from transparent on scroll to protect page visibility.
 * 
 * DESIGN FEATURES:
 * - Animated sliding underbar for active item indication.
 * - Mobile slide-out overlay utilizing Framer Motion for premium fluidity.
 * - High-contrast spacing and touch-friendly dimensions.
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShieldCheck, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hotelConfig } from "../../config/hotel";
import { mainNavigation } from "../../config/navigation";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll positioning to switch header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Hide navigation bar completely on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
          isScrolled 
            ? "bg-bg-base/95 backdrop-blur-md shadow-sm border-b border-border-custom/50 py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand Title */}
          <Link 
            href="/"
            className="flex flex-col group focus:outline-none"
            aria-label="Mahendra Hotel Home"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-text-main group-hover:text-primary transition-colors duration-200">
              {hotelConfig.logoText}
            </span>
            <span className="text-[9px] font-serif tracking-[0.25em] text-primary uppercase leading-tight font-semibold">
              {hotelConfig.logoSubtext}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-1 hover:text-primary focus:outline-none",
                    isActive ? "text-primary" : "text-text-main/80"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Quick Direct Booking CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href={`tel:${hotelConfig.phoneDial}`}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm text-xs font-sans tracking-wider font-bold transition-all duration-200 focus:outline-none"
              aria-label={`Call Mahendra Hotel at ${hotelConfig.phoneDisplay}`}
            >
              <Phone size={12} />
              CALL NOW
            </a>
            <a
              href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(hotelConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-sm text-xs font-sans tracking-wider font-bold transition-all duration-200 focus:outline-none"
              aria-label="Chat with Mahendra Hotel on WhatsApp"
            >
              <MessageSquare size={12} />
              WHATSAPP
            </a>
          </div>

          {/* Mobile Menu Action Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-main p-1 hover:text-primary focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-bg-base shadow-2xl p-8 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Mobile Drawer Title Header */}
                <div className="flex justify-between items-center mb-8 border-b border-border-custom/50 pb-4">
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-widest">{hotelConfig.logoText}</span>
                    <span className="text-[8px] font-serif tracking-widest text-primary uppercase font-semibold">{hotelConfig.logoSubtext}</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-text-main p-1 hover:text-primary focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Navigation Links Stack */}
                <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
                  {mainNavigation.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "font-sans text-base font-semibold tracking-wide py-1 border-b border-transparent hover:text-primary transition-colors",
                          isActive ? "text-primary border-primary/20" : "text-text-main/80"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Footer Contacts */}
              <div className="border-t border-border-custom/50 pt-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Clean & Secure Stay</span>
                </div>
                <a
                  href={`tel:${hotelConfig.phoneDial}`}
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-sm text-sm font-sans tracking-widest font-bold transition-all duration-200 focus:outline-none shadow-sm"
                >
                  <Phone size={14} />
                  CALL RECEPTION
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
