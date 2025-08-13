"use client";

import { useState, useRef, useEffect } from "react";
// If you have an abs/absOrFallback helper, import it and pass the canonical URL in as a prop.
// import { absOrFallback } from "@/utils/urlUtils";

// Icons (unchanged)
const LinkIcon = (props) => (/* ...same as you have... */ <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M10.59 13.41a1 1 0 0 1 0-1.41l2-2a3 3 0 1 1 4.24 4.24l-2 2a1 1 0 0 1-1.41-1.41l2-2a1 1 0 1 0-1.41-1.41l-2 2a3 3 0 1 1-4.24-4.24l2-2a1 1 0 1 1 1.41 1.41l-2 2a1 1 0 0 0 1.41 1.41Z"/></svg>);
const XIcon = (props) => (/* ... */ <svg viewBox="0 0 1200 1227" aria-hidden="true" {...props}><path fill="currentColor" d="M714.2 519.8 1130.6 0H1000.3L667.7 410.1 412.8 0H0l435.1 668.3L0 1226.6h130.3l351.3-430.2 269.6 430.2h412.8L714.2 519.8Zm-124.2 153.1-40.7-62.3L177.3 94.8h177.2l261.6 400.6 40.7 62.3 400.2 612.2H879.8L590 672.9Z"/></svg>);
const FacebookIcon = (props) => (/* ... */ <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>);
const LinkedInIcon = (props) => (/* ... */ <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M20.45 20.45h-3.55v-5.6c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.96v5.7H9.35V9h3.4v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.34 4.22 5.39v6.36ZM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm-1.78 13h3.55V9h-3.55v11.44Z"/></svg>);
const ExternalIcon = (props) => (/* ... */ <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M14 5h5v5M19 5l-8 8"/><rect x="4" y="9" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2" fill="none" /></svg>);

// Centered popup helper
function popup(url) {
  const w = 720, h = 600;
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
  window.open(
    url,
    "_blank",
    `noopener,noreferrer,toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=${w},height=${h},top=${y},left=${x}`
  );
}

export default function ShareButton({ article, canonicalUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  // Close on outside click + Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) setIsOpen(false);
    };
    const handleEsc = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Prefer the canonical URL you pass in (absolute), fallback to window
  const shareUrl =
    canonicalUrl ||
    (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = article?.title || "Check out this article";
  const shareText = article?.description || "";

  // If device supports native share, use that from the main button
  const handlePrimaryShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        return;
      } catch {
        // user cancelled; no-op
      }
    }
    // fallback to dropdown
    setIsOpen((v) => !v);
  };

  const shareOptions = [
    {
      name: "Copy link",
      icon: <LinkIcon className="h-5 w-5" />,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        setIsOpen(false);
      },
    },
    {
      name: "Share on X",
      icon: <XIcon className="h-5 w-5" />,
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareTitle
        )}&url=${encodeURIComponent(shareUrl)}`;
        popup(url);
        setIsOpen(false);
      },
    },
    {
      name: "Share on Facebook",
      icon: <FacebookIcon className="h-5 w-5" />,
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        popup(url);
        setIsOpen(false);
      },
    },
    {
      name: "Share on LinkedIn",
      icon: <LinkedInIcon className="h-5 w-5" />,
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        popup(url);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="relative inline-block" ref={popupRef}>
      {/* Pill button */}
      <button
        onClick={handlePrimaryShare}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-2 text-[17px] font-semibold text-gray-900 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] hover:bg-gray-50 active:opacity-90"
      >
        <span>Share Article</span>
        <ExternalIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-2xl border border-gray-200 bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur"
        >
          <ul className="py-2">
            {shareOptions.map((opt, idx) => (
              <li key={idx}>
                <button
                  role="menuitem"
                  onClick={opt.action}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <span className="text-gray-900">{opt.icon}</span>
                  <span>{opt.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
