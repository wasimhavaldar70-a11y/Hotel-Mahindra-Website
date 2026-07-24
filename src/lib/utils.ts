/**
 * ============================================================================
 * HELPER UTILITIES
 * 
 * PURPOSE:
 * Centralizes the classnames merge utility standard across Tailwind-based React setups.
 * Combines 'clsx' and 'tailwind-merge' to resolve class name conflicts.
 * ============================================================================
 */

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
