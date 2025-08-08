"use client";

import { useState, useRef, useEffect } from 'react';

export default function ShareButton({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article?.title || 'Check out this article';
  const shareText = article?.description || '';
  const shareImage = article?.coverImage || '';

  const shareOptions = [
    {
      name: 'Copy link',
      icon: '🔗',
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        setIsOpen(false);
      }
    },
    {
      name: 'Share on X',
      icon: '𝕏',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
        setIsOpen(false);
      }
    },
    {
      name: 'Share on Facebook',
      icon: '📘',
      action: () => {
        // Facebook will automatically pick up the Open Graph meta tags
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
        setIsOpen(false);
      }
    },
    {
      name: 'Share on LinkedIn',
      icon: '💼',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <span className="text-sm font-medium">Share Article</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08264 9.26727C7.54305 8.48816 6.61644 8 5.5 8C4.11929 8 3 9.11929 3 10.5C3 11.8807 4.11929 13 5.5 13C6.61644 13 7.54305 12.5118 8.08264 11.7327L15.0227 15.6294C15.0077 15.7508 15 15.8745 15 16C15 17.6569 16.3431 19 18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 16.1255 15.0077 16.2492 15.0227 16.3706L8.08264 12.4739C7.54305 13.253 6.61644 13.7412 5.5 13.7412C4.11929 13.7412 3 12.6219 3 11.2412C3 9.86048 4.11929 8.74121 5.5 8.74121C6.61644 8.74121 7.54305 9.22941 8.08264 10.0085L15.0227 6.11184C15.0077 5.9904 15 5.86671 15 5.74121C15 4.36048 16.3431 3.24121 18 3.24121C19.6569 3.24121 21 4.36048 21 5.74121C21 7.12193 19.6569 8.24121 18 8.24121" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
              >
                <span className="text-lg">{option.icon}</span>
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 