import React from 'react';
import Header from '../components/Header';
import { absOrFallback } from '../utils/urlUtils';

const AboutUs = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Content */}
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
        <img
          src={absOrFallback('assets/Rectangle.png')}
          alt="Decorative Rectangle"
          className="hidden sm:block"
          style={{
            position: 'absolute',
            width: '110px',
            height: '300px',
            top: '150px',
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
            width: '105px',
            height: '130px',
            top: '450px',
            right: 80,
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
            width: '105px',
            height: '260px',
            top: '500px',
            right: 0,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <Header />
        <div className="ml-[60px]">
          <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12" style={{ paddingBottom: '100px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 sm:mb-6" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Your atlas to a life<br /><span style={{
            fontWeight: 700,
            fontFamily: 'var(--font-mazzard-soft)',
             fontSize: '72px'
          }}>with a good design.</span></h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '40px',
            marginBottom: '70px',
            maxWidth: '50vw'

          }}>
            Discover the stories, trends, and<br />
            experiences that shape <span style={{ fontWeight: 700 }}>
              how we live,<br />
              work, and connect, blending everyday.
            </span>
          </p>
          <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '28px',
            letterSpacing: '0%',
            color: '#000',
            whiteSpace: 'pre-line',
            maxWidth: '50%',
            fontSize: '18px'
          }}>
            Architecture Wave is a design and travel platform celebrating how spaces shape us — emotionally, spiritually, and sensorially.
            <br /><br />
            Born on Instagram and now evolving into a digital magazine, we spotlight architecture not just as form, but as feeling. From poetic villas on remote coastlines to soulful interiors that speak in silence, we curate stories that connect beauty with meaning.
            <br /><br />
            Our audience, over 12 million monthly design lovers, includes tastemakers, architects, and dreamers from across the globe. Together, we explore the spaces that stay with us long after we leave them.
            <br /><br />
            Through visuals, words, and our signature calm aesthetic, Architecture Wave is not just about design — it&apos;s about how design moves us.
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