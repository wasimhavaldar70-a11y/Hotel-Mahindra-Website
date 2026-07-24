"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "../../lib/utils";

/**
 * ============================================================================
 * CUSTOM LAZY-LOADING IMAGE WRAPPER WITH ELEGANT PLACEHOLDER FALLBACK
 * 
 * PURPOSE:
 * Wraps next/image with a sleek, warm-beige skeleton loading frame.
 * Gracefully handles missing assets or image load errors by displaying a
 * high-end hotel placeholder banner until new photos are uploaded.
 * ============================================================================
 */

interface CustomImageProps extends Omit<ImageProps, "onLoad" | "placeholder"> {
  containerClassName?: string;
  fallbackTitle?: string;
}

export default function CustomImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackTitle,
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isInvalidSrc = !src || src === "" || hasError;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#F7F5F0] border border-stone-200/60 w-full h-full flex items-center justify-center select-none group",
        containerClassName
      )}
    >
      {/* Loading Skeleton Frame */}
      {isLoading && !isInvalidSrc && (
        <div 
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#F7F5F0] via-[#ECE7DE] to-[#F7F5F0] z-10" 
          aria-hidden="true"
        />
      )}

      {isInvalidSrc ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#F7F5F0] text-stone-600 z-0">
          <div className="w-10 h-10 mb-2 rounded-full bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-700 shadow-xs">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-serif text-xs font-semibold text-stone-800 tracking-wide line-clamp-1 max-w-[90%]">
            {fallbackTitle || alt || "Mahendra Hotel"}
          </span>
          <span className="text-[10px] text-amber-800/70 font-mono font-medium uppercase tracking-widest mt-1">
            Photo Pending
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt || "Mahendra Hotel Photo"}
          className={cn(
            "transition-all duration-700 ease-out object-cover w-full h-full",
            isLoading ? "scale-105 blur-md" : "scale-100 blur-0",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </div>
  );
}

