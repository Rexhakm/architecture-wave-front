"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { absOrFallback } from '../utils/urlUtils';
import { CATEGORY_COLORS } from '../utils/categoryColors';

export default function Header({ tintColor }: { tintColor?: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Show navigation on all pages
  const shouldShowNavigation = true;

  // Determine active category color from path `/category/[slug]`
  const getActiveCategoryColor = (): string | undefined => {
    if (!pathname) return undefined;
    const match = pathname.match(/^\/category\/([^/]+)/);
    if (!match) return undefined;
    const currentSlug = match[1];

    // Mirror slugification used when generating category links
    const slugify = (name: string) =>
      name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\+/g, 'plus')
        .replace(/[^a-z0-9-]/g, '');

    for (const name of Object.keys(CATEGORY_COLORS)) {
      if (slugify(name) === currentSlug) {
        return CATEGORY_COLORS[name];
      }
    }
    return undefined;
  };

  const activeCategoryColor = tintColor || getActiveCategoryColor();

  return (
    <header className="relative w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6" style={{ marginTop: '20px', borderRadius: '45px' }}>
      <div className="flex items-center gap-2 justify-center sm:justify-start" style={{ marginLeft: '0px', marginTop: '25px' }}>
        <div className="sm:ml-[70px]">
        <Link href={absOrFallback('/')} style={{ position: 'relative', display: 'inline-block', width: '72px', height: '40px' }} aria-label="Go to home">
          <div
            style={{
              width: '72px',
              height: '40px',
              backgroundColor: activeCategoryColor || 'black',
              WebkitMaskImage: `url(${absOrFallback('/assets/arch_icon.png') || '/assets/arch_icon.png'})`,
              maskImage: `url(${absOrFallback('/assets/arch_icon.png') || '/assets/arch_icon.png'})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              display: 'inline-block',
            }}
          />
        </Link>
        <span className="font-bold text-base sm:text-lg text-black">Architecture Wave</span>
        </div>
      </div>
      
      {/* Desktop Navigation - Only show on home page */}
      {shouldShowNavigation && (
        <nav className="hidden md:flex items-center text-sm font-medium text-gray-700" style={{ marginTop: '25px' }}>
          <div
            style={{ position: 'relative', marginRight: '60px' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => { setDropdownOpen(false); setHoveredIndex(-1); }}
          >
            <a
              href="#"
              style={{
                fontFamily: 'Sora',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '0%',
                textTransform: 'none',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              Magazine
              <svg style={{ marginLeft: 4 }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  borderRadius: '8px',
                  minWidth: '120px',
                  zIndex: 100,
                  padding: '12px 0',
                }}
              >
                {Object.keys(CATEGORY_COLORS).map((item, idx) => {
                  // Handle spaces and special characters in category names by converting to URL-friendly format
                  const categorySlug = item.toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with hyphens
                    .replace(/\+/g, 'plus')         // Replace + with 'plus'
                    .replace(/[^a-z0-9-]/g, '');   // Remove any other special characters
                  
                  return (
                    <Link
                      key={item}
                      href={absOrFallback(`/category/${categorySlug}`)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                      style={{
                        display: 'block',
                        padding: '10px 24px',
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '19px',
                        letterSpacing: '0%',
                        color: hoveredIndex === idx ? 'white' : 'black',
                        background: hoveredIndex === idx ? 'black' : 'transparent',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        borderRadius: '4px',
                        transition: 'background 0.15s, color 0.15s',
                      }}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {/* Shop link hidden
          <Link href="/shop" style={{ 
            marginRight: '60px',
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '19px',
            letterSpacing: '0%',
            textTransform: 'none',
            color: 'black',
            textDecoration: 'none'
          }}>Shop</Link>
          */}
          <Link href="/about-us" style={{ 
            marginRight: '60px',
            fontFamily: 'Sora',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '19px',
            letterSpacing: '0%',
            textTransform: 'none',
            color: 'black',
            textDecoration: 'none'
          }}>About Us</Link>
          <Link href="/contact-us" style={{ 
            marginRight: '60px',
            fontFamily: 'Sora',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '19px',
            letterSpacing: '0%',
            textTransform: 'none',
            color: 'black',
            textDecoration: 'none'
          }}>Contact Us</Link>
        </nav>
      )}

      {/* Mobile Menu Button - Only show on home page */}
      {shouldShowNavigation && (
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ marginTop: '25px' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}

      {/* Mobile Menu - Only show on home page */}
      {shouldShowNavigation && mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 md:hidden" style={{ marginTop: '0' }}>
          <div className="px-4 py-6 space-y-4">
            <div className="border-b pb-4">
              <a href="#" className="block py-2 text-black font-medium">Magazine</a>
              <div className="pl-4 space-y-2 mt-2">
                {Object.keys(CATEGORY_COLORS).map((item) => {
                  // Handle spaces and special characters in category names by converting to URL-friendly format
                  const categorySlug = item.toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with hyphens
                    .replace(/\+/g, 'plus')         // Replace + with 'plus'
                    .replace(/[^a-z0-9-]/g, '');   // Remove any other special characters
                  
                  return (
                    <Link
                      key={item}
                      href={absOrFallback(`/category/${categorySlug}`)}
                      className="block py-1 text-gray-600 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Shop link hidden
            <Link href="/shop" className="block py-2 text-black font-medium">Shop</Link>
            */}
            <Link href="/about-us" className="block py-2 text-black font-medium" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact-us" className="block py-2 text-black font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 