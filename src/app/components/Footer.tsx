import React from "react";
import { absOrFallback } from '../utils/urlUtils';

export default function Footer() {
  return (
    <footer
      className="bg-black text-white p-6 sm:p-10 relative overflow-hidden font-mazzard-soft"
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: '45px'
      }}
    >
      {/* Background Vectors */}
      <img
        src={absOrFallback('/assets/Vector-5.png')}
        alt="Decorative element"
        className="absolute top-0 right-0 w-32 h-32 opacity-10"
        style={{ zIndex: 0 }}
      />
      <img
        src={absOrFallback('/assets/Vector-6.png')}
        alt="Decorative element"
        className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
        style={{ zIndex: 0 }}
      />

      {/* Main Content Container with left margin */}
      <div className="relative z-10 flex flex-col h-full ml-4 sm:ml-[60px] mr-4 sm:mr-[60px]" style={{ paddingTop: '40px' }}>
        {/* Top Section - Brand and Navigation */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:justify-between mb-16 lg:mb-20">
          {/* Left Section - Brand */}
          <div className="flex-1 max-w-md">
            {/* Logo */}
            <div className="flex items-start gap-2 mb-10">
              <img src={absOrFallback('/assets/Vector.png')} alt="a" className="h-16 sm:h-20 md:h-28 w-auto" />
              <img src={absOrFallback('/assets/Vector-2.png')} alt="w" className="h-16 sm:h-20 md:h-28 w-auto" />
              <div className="flex items-center ml-2">
                <img src={absOrFallback('/assets/Vector-3.png')} alt="T" className="h-3 sm:h-4 w-auto" />
                <img src={absOrFallback('/assets/Vector-4.png')} alt="M" className="h-3 sm:h-4 w-auto" />
              </div>
            </div>

            {/* Brand Description */}
            <p
              className="text-sm text-gray-200"
              style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.05em',
              }}
            >
              A lens on global architecture and interiors,{" "}
              <span
                style={{
                  fontFamily: 'var(--font-mazzard-soft)',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0.05em',
                }}
              >
                where culture, emotion, and everyday life{" "}
              </span>
              unfold into the language of design.
            </p>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-20">
            {/* Explore Column */}
            <div>
              <h4
                className="font-semibold mb-8 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--font-mazzard-soft)',
                  fontWeight: 500,
                  lineHeight: '140%',
                  letterSpacing: '0.04em',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  color: 'rgba(230, 230, 230, 0.6)',
                }}
              >
                Explore
              </h4>
              <ul className="space-y-5 text-sm text-gray-300">
                <li style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', marginTop: '40px' }}>
                  <a href={absOrFallback('/about-us')}>About Us</a>
                </li>
                <li style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', marginTop: '40px' }}>
                  <a href={absOrFallback('/about-us')}>Our Mission</a>
                </li>
              </ul>
            </div>

            {/* Say hello! Column */}
            <div>
              <h4
                className="font-semibold mb-8 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--font-mazzard-soft)',
                  fontWeight: 500,
                  lineHeight: '140%',
                  letterSpacing: '0.04em',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  color: 'rgba(230, 230, 230, 0.6)',
                }}
              >
                Say Hello!
              </h4>
              <ul className="space-y-5 text-sm text-gray-300">
                <li style={{ marginTop: '40px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%' }}><a href="https://www.facebook.com/architecturewave" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li style={{ marginTop: '40px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%' }}><a href="https://www.instagram.com/architecture.wave/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li style={{ marginTop: '40px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%' }}><a href="https://www.pinterest.com/architecturewave/" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Newsletter and Action Links */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:justify-between mt-auto pt-12 lg:pt-16">
          {/* Newsletter */}
          <div className="flex-1 max-w-md">
            <div className="mb-8">
              <span style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.05em',
              }}>
                Get our newsletter.
              </span>
            </div>
            <form
              className="flex items-center bg-white border border-black rounded-xl pl-4 pr-2"
              style={{ width: '100%', maxWidth: '363px', height: '50px' }}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent outline-none text-black h-full text-sm sm:text-base"
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  fontFamily: 'var(--font-mazzard-soft)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0.05em',
                }}
              />
              <button
                type="submit"
                className="bg-black text-white font-bold ml-2 h-full text-xs sm:text-sm"
                style={{
                  width: '80px',
                  height: '45px',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  fontSize: '10px',
                  lineHeight: '120%',
                  letterSpacing: '-0.2292px',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16" style={{ marginTop: '50px' }}>
            {['CONTACT US', 'ADVERTISE', 'EDITORIAL SUBMISSION'].map((title, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs sm:text-sm mb-4 uppercase" style={{
                  color: 'rgba(230,230,230,0.6)',
                  letterSpacing: '4%',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mazzard-soft)',
                  lineHeight: '140%',
                  fontVariantNumeric: 'lining-nums tabular-nums'
                }}>
                  {title}
                </span>
                <a href="mailto:contact@architecturewave.com" className="text-sm sm:text-base" style={{
                  fontWeight: 500,
                  fontFamily: 'var(--font-mazzard-soft)',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  Got an idea?
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
