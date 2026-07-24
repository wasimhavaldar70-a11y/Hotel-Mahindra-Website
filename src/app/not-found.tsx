import React from "react";
import Link from "next/link";
import { Compass, Home, Phone } from "lucide-react";
import { hotelConfig } from "../config/hotel";

/**
 * ============================================================================
 * CUSTOM 404 - PAGE NOT FOUND
 * 
 * PURPOSE:
 * Displays a clean, luxury styled error screen when path routing fails.
 * Helps redirect guests safely back to active marketing pages.
 * ============================================================================
 */

export default function NotFound() {
  return (
    <div className="bg-bg-base font-sans min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        
        {/* Visual Error Icon */}
        <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center text-primary mx-auto">
          <Compass size={28} className="animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-bold tracking-wide text-text-main">
            404 — Page Not Found
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            The path you are looking for does not exist or has been relocated. 
            Use the navigation controls below to return safely.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 justify-center">
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm text-xs font-bold tracking-widest transition-all focus:outline-none"
          >
            <Home size={14} />
            RETURN TO HOMEPAGE
          </Link>

          <a
            href={`tel:${hotelConfig.phoneDial}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-border-custom hover:bg-bg-alt text-text-main px-6 py-3 rounded-sm text-xs font-bold tracking-widest transition-all focus:outline-none"
          >
            <Phone size={14} />
            DIAL RECEPTION
          </a>

        </div>

      </div>
    </div>
  );
}
