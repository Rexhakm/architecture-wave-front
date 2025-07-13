"use client";

import React, { useState } from "react";
import Link from 'next/link';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <header className="w-full flex items-center justify-between px-8 py-6" style={{ marginTop: '20px' }}>
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
        <span className="font-bold text-lg text-black">Architecture Wave</span>
      </div>
      <nav className="flex items-center text-sm font-medium text-gray-700">
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
    </header>
  );
} 