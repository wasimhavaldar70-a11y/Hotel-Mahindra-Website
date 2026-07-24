"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * ============================================================================
 * MAIN CONTENT WRAPPER COMPONENT
 * 
 * PURPOSE:
 * Wraps page content and conditionally manages top padding based on the current
 * route. On marketing pages, applies top padding for the fixed navbar.
 * On admin pages (/admin), removes top padding for full screen layout control.
 * ============================================================================
 */
export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={`flex-grow ${isAdmin ? "" : "pt-[72px] md:pt-[80px]"}`}>
      {children}
    </main>
  );
}
