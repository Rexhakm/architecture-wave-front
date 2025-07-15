"use client";

import React, { useState } from "react";
import Link from 'next/link';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6" style={{ marginTop: '20px' }}>
      <div className="flex items-center gap-2">
        <Link href="/" style={{ position: 'relative', display: 'inline-block', width: '38px', height: '33px' }}>
          <img src="/assets/Vector-7.png" alt="logo" style={{ width: '38px', height: '33px' }} />
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              left: '93%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'black',
              lineHeight: 1,
              background: 'transparent',
              padding: '0 2px',
            }}
          >
            ™
          </span>
        </Link>
        <span className="font-bold text-base sm:text-lg text-black">Architecture Wave</span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center text-sm font-medium text-gray-700">
        <div
          style={{ position: 'relative', marginRight: '40px' }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => { setDropdownOpen(false); setHoveredIndex(-1); }}
        >
          <a
            href="#"
            style={{
              fontFamily: 'Inter',
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
              {['Lifestyle', 'Travel', 'DIY', 'Art'].map((item, idx) => (
                <Link
                  key={item}
                  href={`/category/${item.toLowerCase()}`}
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
              ))}
            </div>
          )}
        </div>
        <a href="#" style={{ 
          marginRight: '40px',
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '19px',
          letterSpacing: '0%',
          textTransform: 'none',
          color: 'black'
        }}>Shop</a>
        <Link href="/about-us" style={{ 
          marginRight: '40px',
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '19px',
          letterSpacing: '0%',
          textTransform: 'none',
          color: 'black',
          textDecoration: 'none'
        }}>About Us</Link>
        <Link href="/contact-us" style={{ 
          marginRight: '40px',
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '19px',
          letterSpacing: '0%',
          textTransform: 'none',
          color: 'black',
          textDecoration: 'none'
        }}>Contact Us</Link>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-gray-100"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 md:hidden">
          <div className="px-4 py-6 space-y-4">
            <div className="border-b pb-4">
              <a href="#" className="block py-2 text-black font-medium">Magazine</a>
              <div className="pl-4 space-y-2 mt-2">
                {['Lifestyle', 'Travel', 'DIY', 'Art'].map((item) => (
                  <Link
                    key={item}
                    href={`/category/${item.toLowerCase()}`}
                    className="block py-1 text-gray-600 hover:text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <a href="#" className="block py-2 text-black font-medium">Shop</a>
            <Link href="/about-us" className="block py-2 text-black font-medium" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact-us" className="block py-2 text-black font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <div className="pt-4 border-t">
              <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="text-sm">Search</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 