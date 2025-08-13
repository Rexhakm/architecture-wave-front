import React from 'react';
import Header from '../components/Header';
import { absOrFallback } from '../utils/urlUtils';

const AboutUs = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Content */}
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] md:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 md:px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
        <img
          src={absOrFallback('assets/Rectangle.png')}
          alt="Decorative Rectangle"
          className="hidden sm:block"
          style={{
            position: 'absolute',
            width: '80px',
            height: '200px',
            top: '100px',
            right: 0,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <img
          src={absOrFallback('assets/Rectangle2.png')}
          alt="Decorative Rectangle"
          className="hidden sm:block"
          style={{
            position: 'absolute',
            width: '80px',
            height: '100px',
            top: '300px',
            right: 60,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <img
          src={absOrFallback('assets/Rectangle3.png')}
          alt="Decorative Rectangle"
          className="hidden sm:block"
          style={{
            position: 'absolute',
            width: '80px',
            height: '200px',
            top: '350px',
            right: 0,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <Header />
        <div className="ml-[20px] sm:ml-[40px] md:ml-[60px]">
          <div className="px-2 sm:px-4 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12" style={{ paddingBottom: '60px' }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal mb-3 sm:mb-4 md:mb-6" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Your atlas to a life<br /><span style={{
            fontWeight: 700,
            fontFamily: 'var(--font-mazzard-soft)'
          }}>with a good design.</span></h1>
          <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: '5%',
            color: '#000',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '20px',
            marginBottom: '40px',
            maxWidth: '90vw'

          }}>
            Discover the stories, trends, and<br />
            experiences that shape <span style={{ fontWeight: 700 }}>
              how we live,<br />
              work, and connect, blending everyday.
            </span>
          </p>
          <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6" style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#000',
            whiteSpace: 'pre-line',
            maxWidth: '90%',
            fontSize: '14px'
          }}>
            Architecture Wave is a design and travel platform celebrating how spaces shape us — emotionally, spiritually, and sensorially.
            <br /><br />
            Born on Instagram and now evolving into a digital magazine, we spotlight architecture not just as form, but as feeling. From poetic villas on remote coastlines to soulful interiors that speak in silence, we curate stories that connect beauty with meaning.
            <br /><br />
            Our audience, over 12 million monthly design lovers, includes tastemakers, architects, and dreamers from across the globe. Together, we explore the spaces that stay with us long after we leave them.
            <br /><br />
            Through visuals, words, and our signature calm aesthetic, Architecture Wave is not just about design — it's about how design moves us.
            <br /><br />
            Our mission is to awaken deeper emotional connection with the spaces we inhabit and inspire a more mindful way of experiencing the world through architecture.
          </p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs; 