import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-3xl p-10 flex flex-col md:flex-row gap-10 md:gap-0 justify-between relative overflow-hidden font-mazzard-soft" style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, height: 650, paddingBottom: 40 }}>
      {/* Background Vectors */}
      <img src="/assets/Vector-5.png" alt="background vector 5" style={{ position: 'absolute', left: 0, bottom: 0, width: '60%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />
      <img src="/assets/Vector-6.png" alt="background vector 6" style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />
      <div className="flex-1 min-w-[250px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-start gap-2 relative" style={{ paddingLeft: '40px', paddingTop: '40px' }}>
            <img src="/assets/Vector.png" alt="a" className="h-20 md:h-28 w-auto" />
            <img src="/assets/Vector-2.png" alt="w" className="h-20 md:h-28 w-auto" />
            <div className="flex items-center ml-2">
              <img src="/assets/Vector-3.png" alt="T" className="h-4 w-auto" />
              <img src="/assets/Vector-4.png" alt="M" className="h-4 w-auto" />
            </div>
          </div>
        </div>
        <p
          className="mb-6 text-sm text-gray-200 max-w-xs"
          style={{
            paddingLeft: '40px',
            paddingTop: '25px',
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '0.05em',
          }}
        >
          Discover the stories, trends, and experiences that shape
          <span
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '0.05em',
            }}
          >
            how we live, work, and connect, blending everyday lifestyle 
          </span>
          <span> </span>
          with rich cultural insights.
        </p>
        <div className="mb-4" style={{ marginTop: '100px', marginLeft: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '0.05em',
            }}
          >
            Get our newsletter.
          </span>
        </div>
        <form
          className="flex items-center bg-white border border-black rounded-xl pl-4 pr-2"
          style={{ marginLeft: '40px', marginRight: '40px', width: '363px', height: '55px' }}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-transparent outline-none text-black h-full"
            style={{
              border: 'none',
              boxShadow: 'none',
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '28px',
              letterSpacing: '0.05em',
            }}
          />
          <button
            type="submit"
            className="bg-black text-white font-bold ml-2 h-full"
            style={{
              width: '90.06px',
              height: '50px',
              borderRadius: '12px',
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '11.46px',
              lineHeight: '120%',
              letterSpacing: '-0.2292px',
              fontVariantNumeric: 'lining-nums tabular-nums',
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-10 md:gap-20 justify-end" style={{ paddingRight: '40px', paddingTop: '40px' }} >
        <div style={{ paddingRight: '40px'}}>
          <h4
            className="font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '20.57px',
              lineHeight: '140%',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'lining-nums tabular-nums',
              color: 'rgba(230, 230, 230, 0.6)',
            }}
          >
            Exolore
          </h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li style={{ paddingTop: '30px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">About Us</a></li>
            <li style={{ paddingTop: '20px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Our Mission</a></li>
            <li style={{ paddingTop: '20px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Media Kit</a></li>
          </ul>
        </div>
        <div>
          <h4
            className="font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '20.57px',
              lineHeight: '140%',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'lining-nums tabular-nums',
              color: 'rgba(230, 230, 230, 0.6)',
            }}
          >
            Say hello!
          </h4>
          <ul className="space-y-1 text-sm text-gray-300" >
            <li style={{ paddingTop: '30px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Youtube</a></li>
            <li style={{ paddingTop: '20px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Instagram</a></li>
            <li style={{ paddingTop: '20px', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Twitter (X)</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row gap-10 absolute right-10 bottom-10">
            <div className="flex flex-col ">
              <span style={{ color: 'rgba(230,230,230,0.6)', fontSize: '11px', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>CONTACT US</span>
              <div className="flex items-center" style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '16.83px', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'white', marginLeft: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col" style={{ marginLeft: '20px' }}>
              <span style={{ color: 'rgba(230,230,230,0.6)', fontSize: '11px', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>ADVERTISE</span>
              <div className="flex items-center" style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '16.83px', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'white', marginLeft: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col" style={{ marginRight: '40px', marginLeft: '20px' }}>
              <span style={{ color: 'rgba(230,230,230,0.6)', fontSize: '11px', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>EDITORIAL SUBMISSION</span>
              <div className="flex items-center" style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '16.83px', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'white', marginLeft: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
  
    </footer>
  );
} 