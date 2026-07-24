"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import { hotelConfig } from "../../config/hotel";
import { mainNavigation, footerSecondaryNavigation } from "../../config/navigation";

/**
 * ============================================================================
 * FOOTER COMPONENT
 * 
 * PURPOSE:
 * Serves as the landing closure of the website. Organizes structural layout
 * elements, direct contact dial links, business hour details, and legal pages.
 * 
 * DESIGN FEATURES:
 * - Symmetrical double-border dividers for high-end feel.
 * - Understated neutral background reflecting a premium budget stance.
 * - Semantic layout structure.
 * ============================================================================
 */

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-bg-alt border-t border-border-custom/80 pt-16 pb-8 px-6 md:px-12 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
        {/* Column 1: Brand & Bio */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-widest text-text-main">
              {hotelConfig.logoText}
            </span>
            <span className="text-[10px] font-sans tracking-[0.25em] text-primary uppercase font-bold">
              {hotelConfig.logoSubtext}
            </span>
          </div>
          <p className="text-text-muted text-sm max-w-sm font-sans leading-relaxed">
            {hotelConfig.description}
          </p>
          <div className="pt-2 text-xs font-sans font-semibold text-primary-dark tracking-wide uppercase">
            Clean • Secure • Comfortable • Value for Money
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="font-serif text-base font-bold tracking-wider text-text-main">Useful Links</h3>
          <ul className="space-y-3 font-sans text-sm text-text-muted">
            {mainNavigation.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className="hover:text-primary transition-colors focus:outline-none flex items-center group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Direct Connect */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-serif text-base font-bold tracking-wider text-text-main">Reach Out</h3>
          <ul className="space-y-3 font-sans text-sm text-text-muted">
            
            {/* Address */}
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-1 shrink-0" />
              <a 
                href={hotelConfig.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors leading-relaxed focus:outline-none"
              >
                {hotelConfig.address}
              </a>
            </li>

            {/* Direct Phone Dial */}
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-primary shrink-0" />
              <a 
                href={`tel:${hotelConfig.phoneDial}`} 
                className="hover:text-primary transition-colors focus:outline-none font-semibold text-text-main"
              >
                {hotelConfig.phoneDisplay}
              </a>
            </li>

            {/* Direct WhatsApp Chat */}
            <li className="flex items-center gap-3">
              <MessageSquare size={16} className="text-primary shrink-0" />
              <a 
                href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(hotelConfig.whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus:outline-none font-semibold text-text-main"
              >
                {hotelConfig.whatsappDisplay} (WhatsApp)
              </a>
            </li>

            {/* General Email */}
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-primary shrink-0" />
              <a 
                href={`mailto:${hotelConfig.email}`} 
                className="hover:text-primary transition-colors focus:outline-none"
              >
                {hotelConfig.email}
              </a>
            </li>

            {/* Timing Rules */}
            <li className="flex items-center gap-3 pt-2 text-xs text-text-muted border-t border-border-custom/50">
              <Clock size={14} className="text-primary shrink-0" />
              <span>Check-in: <strong>{hotelConfig.checkInTime}</strong> | Check-out: <strong>{hotelConfig.checkOutTime}</strong></span>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Legal Copyright Strip */}
      <div className="max-w-7xl mx-auto border-t border-border-custom/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted font-sans gap-4">
        <div>
          &copy; {currentYear} {hotelConfig.name}. All rights reserved.
        </div>
        <div className="flex items-center space-x-6">
          {footerSecondaryNavigation.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="hover:text-primary transition-colors focus:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
