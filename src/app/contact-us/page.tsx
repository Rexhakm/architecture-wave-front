"use client";
import React from 'react';
import Header from '../components/Header';
import { absOrFallback } from '../utils/urlUtils';
import ProductImage from '../components/ProductImage';

export default function ContactUs() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh'}}>
      
      {/* Main Content */}
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] md:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 md:px-4 bg-white min-h-screen" style={{ 
        marginBottom: 40, 
        position: 'relative', 
        zIndex: 1, 
        borderRadius: '45px',
      }}>
        <Header />

        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12">
          
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 sm:ml-[45px]">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6 text-left" style={{
              fontFamily: 'var(--font-mazzard-soft)',
              color: '#111',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}>
              Contact<br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{
                fontWeight: 400,
                fontFamily: 'var(--font-mazzard-soft)',
              }}>ArchitectureWave</span>
            </h1>
            
            <p className="text-base sm:text-lg max-w-2xl" style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '5%',
              color: '#111',
              marginBottom: '40px'
            }}>
              Whether you’d like to share feedback, pitch a story, collaborate, or explore partnership opportunities, we’re all ears.
              <br /><br />
              Most inquiries are best directed through one of the dedicated channels below:

            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12 sm:mb-16" style={{ marginLeft: '5px', marginRight: '10px' }}>
            <ProductImage
              src={absOrFallback('/assets/contact-us.png')}
              alt="Modern Architecture Building"
              fallbackSrc="https://via.placeholder.com/1200x550/f3f4f6/9ca3af?text=Contact+Us"
              className="w-full"
              style={{
                height: '550px',
                objectFit: 'cover',
                borderRadius: '45px'
              }}
            />
          </div>

          

          {/* Contact Sections */}
          <div className="flex flex-col gap-8 sm:gap-12 sm:ml-[45px]">
            {/* Editorial Inquiries */}
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: '32px',
                lineHeight: '48px',
                letterSpacing: '0%',
                color: '#111'
              }}>
                Editorial Inquiries
              </h3>
              <p className="text-sm sm:text-base mb-4" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                color: '#666',
                marginBottom: '16px'
              }}>
                For story ideas, project pitches, or contributor questions, please contact us at{' '}
                <a 
                  href="mailto:contact@architecturewave.com" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  contact@architecturewave.com
                </a>
                .
              </p>
              <p className="text-sm sm:text-base" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#666',
                lineHeight: '24px'
              }}>
                We’re particularly interested in narratives that explore architecture, interiors, cultural context, and design as lived experience.
              </p>
            </div>

            

            {/* Partnerships & Advertising */}
            <div className="text-center md:text-left" style={{ marginTop: '40px', marginBottom: '80px' }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: '32px',
                lineHeight: '48px',
                letterSpacing: '0%',
                color: '#111'
              }}>
                Partnerships & Advertising
              </h3>
              <p className="text-sm sm:text-base mb-4" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                color: '#666',
                marginBottom: '16px'
              }}>
                Interested in partnering with Architecture Wave—whether branded content, sponsorship, or media opportunities? Reach out to us at{' '}
                <a 
                  href="mailto:advertising@architecturewave.com" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  advertising@architecturewave.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 