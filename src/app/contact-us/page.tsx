"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { absOrFallback } from '../utils/urlUtils';

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
          <div className="mb-8 sm:mb-12" style={{ marginLeft: '45px' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 sm:mb-6" style={{
              fontFamily: 'var(--font-mazzard-soft)',
              color: '#111',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}>
              Contact<br />
              <span style={{
                fontWeight: 400,
                fontFamily: 'var(--font-mazzard-soft)',
                fontSize: '72px'
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
              We'd love to hear from you. Whether you have questions about our content, want to share your project, or need assistance with your subscription, our team is here to help.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12 sm:mb-16" style={{ marginLeft: '10px', marginRight: '10px' }}>
            <img
              src={absOrFallback('/assets/contact-us.png')}
              alt="Modern Architecture Building"
              style={{
                width: '100%',
                height: '550px',
                objectFit: 'cover',
                borderRadius: '45px'
              }}
            />
          </div>

          {/* Contact Sections */}
          <div className="flex flex-col gap-8 sm:gap-12" style={{ marginLeft: '45px' }}>
            {/* Subscription Help */}
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
                Subscription Help
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
                Need assistance with your subscription? Our customer service team is ready to help with billing questions, account access, and subscription management.
              </p>
              <p className="text-sm sm:text-base" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#666',
                lineHeight: '24px'
              }}>
                Email us at{' '}
                <a 
                  href="mailto:subscriptions@architecturewave.com" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  subscriptions@architecturewave.com
                </a>
                {' '}or call us at{' '}
                <a 
                  href="tel:1-800-ARCH-WAVE" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  1-800-ARCH-WAVE
                </a>
              </p>
            </div>

            {/* Sales & Marketing */}
            <div className="text-center md:text-left" style={{ marginTop: '40px' }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: '32px',
                lineHeight: '48px',
                letterSpacing: '0%',
                color: '#111'
              }}>
                Sales & Marketing
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
                Interested in advertising with us or partnering with ArchitectureWave? Our sales team can help you reach our engaged audience of design professionals and enthusiasts.
              </p>
              <p className="text-sm sm:text-base" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#666',
                lineHeight: '24px'
              }}>
                Contact our sales team at{' '}
                <a 
                  href="mailto:sales@architecturewave.com" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  sales@architecturewave.com
                </a>
                {' '}for advertising opportunities and partnerships.
              </p>
            </div>

            {/* Editorial */}
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
                Editorial
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
                Have a story idea, project submission, or press release? Our editorial team reviews all submissions and would love to hear about innovative architecture and design projects.
              </p>
              <p className="text-sm sm:text-base" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#666',
                lineHeight: '24px'
              }}>
                Send your submissions to{' '}
                <a 
                  href="mailto:editorial@architecturewave.com" 
                  style={{ 
                    color: '#8FC945', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  editorial@architecturewave.com
                </a>
                {' '}with high-resolution images and project details.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 