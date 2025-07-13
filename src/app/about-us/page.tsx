import React from 'react';
import Header from '../components/Header';

const AboutUs = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Content */}
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1 }}>
        <img
          src="assets/Rectangle.png"
          alt="Decorative Rectangle"
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
          src="assets/Rectangle2.png"
          alt="Decorative Rectangle"
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
          src="assets/Rectangle3.png"
          alt="Decorative Rectangle"
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
        <div style={{ padding: '48px 48px 48px 30px' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 400, 
            marginBottom: 0, 
            fontFamily: 'var(--font-mazzard-soft)', 
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Your atlas to a life<br /><span style={{ 
            fontWeight: 700,
            fontSize: '72px',
            lineHeight: '100%',
            letterSpacing: '0%',
            fontFamily: 'var(--font-mazzard-soft)'
          }}>with a good design.</span></h1>
          <p style={{ 
            margin: '24px 0 32px 0', 
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
            maxWidth: '600px'
          }}>
            Discover the stories, trends, and experiences that shape <span style={{ fontWeight: 700 }}>
              how we live, work, and connect, blending everyday.
            </span>
          </p>
          <div style={{ 
            background: '#fff',
            padding: '32px 0',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '0',
          }}>
            <p style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '0%',
              color: '#000',
              marginBottom: '24px',
              whiteSpace: 'pre-line'
            }}>
              “WITCHES wander the weird wilds of the world, unafraid and unfettered. They drip from moonlight and the edges of stars, sculpt each other from beeswax and jackal fangs.”
              <br />These words welcome you to the homepage of Cryptocoven, a collection of 9768 digital-art portraits sold as NFTs.
            </p>
            <p style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '0%',
              color: '#000',
              marginBottom: 0,
              whiteSpace: 'pre-line'
            }}>
              One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled jawline, red eyes, and long, straight, silver hair. “You make your own jewelry from trinkets and dried hearts,” reads the character's description. “Your magic spawns from paint splatters. You see the truth reflected.” Sirius is a mage, a Sagittarius sun, Scorpio moon, and Aquarius rising.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs; 