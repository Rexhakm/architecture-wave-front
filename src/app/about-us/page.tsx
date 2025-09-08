import React from 'react';
import Header from '../components/Header';
import { absOrFallback } from '../utils/urlUtils';

const AboutUs = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Content */}
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
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
        <div className="ml-0 sm:ml-[60px]">
          <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12" style={{ paddingBottom: '100px' }}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Your atlas to a life<br /><span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{
            fontWeight: 700,
            fontFamily: 'var(--font-mazzard-soft)',
          }}>shaped by design.</span></h1>
       
          <p className="text-sm sm:text-base mb-4 sm:mb-6 max-w-full sm:max-w-[50%]" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 400,
            lineHeight: '28px',
            letterSpacing: '0%',
            color: '#000',
            whiteSpace: 'pre-line',
            fontSize: '18px',
            marginTop: '80px',
          }}>
            Architecture Wave is a design and travel platform dedicated to the spaces that move us emotionally, spiritually, and sensorially. What began as an Instagram community has grown into a digital magazine, curating the most compelling stories of architecture, interiors, and destinations around the world.
            <br /><br />
            We see design not as decoration, but as experience. A villa on a remote coastline, an interior that speaks in silence, a city that reshapes who we are. Every feature is chosen for the way it lingers long after you leave.

            <br /><br />
            With an audience of more than 12 million monthly design lovers, including architects, tastemakers, and dreamers, we are a global community united by a shared belief that design is not only seen but deeply felt.
            <br /><br />
            Through evocative visuals, editorial storytelling, and our signature calm aesthetic, Architecture Wave exists to inspire a more mindful way of living and traveling. Our mission is simple yet profound: to awaken deeper emotional connection with the spaces we inhabit and to show how design can transform the way we experience the world.
          </p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs; 