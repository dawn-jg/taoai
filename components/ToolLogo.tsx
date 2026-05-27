'use client';

import { useState, useCallback } from 'react';

interface ToolLogoProps {
  src: string;
  domain?: string;
  alt: string;
  className: string;
}

const FALLBACK_SOURCES = [
  // Index 0: original stored src (ai-bot.cn hosted PNGs, direct URLs, etc.)
  (origSrc: string) => origSrc,
  // Index 1: direct favicon.ico from domain (works for many Chinese sites)
  (origSrc: string, domain?: string) => domain ? `https://${domain}/favicon.ico` : null,
  // Index 2: Google Favicons (blocked in China, but works globally as final fallback)
  (origSrc: string, domain?: string) => domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null,
];

export default function ToolLogo({ src, domain, alt, className }: ToolLogoProps) {
  const [attempt, setAttempt] = useState(0);
  const [hidden, setHidden] = useState(false);

  const handleError = useCallback(() => {
    if (attempt < FALLBACK_SOURCES.length - 1) {
      setAttempt(attempt + 1);
    } else {
      setHidden(true);
    }
  }, [attempt]);

  if (hidden) return null;

  const currentSrc = FALLBACK_SOURCES[attempt](src, domain);
  if (!currentSrc) {
    // This source returned null (e.g., no domain for direct favicon), skip to next
    if (attempt < FALLBACK_SOURCES.length - 1) {
      setAttempt(attempt + 1);
    } else {
      setHidden(true);
    }
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
